import List from '../models/List.js';
import ListItem from '../models/ListItem.js'
import User from '../models/User.js';
import { sendEmail } from '../utils/sendEmail.js';
import { generateEmailToken, verifyEmailToken } from '../utils/token.js';

export const createList = async (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ message: 'List title is required!' });
    }
    try {
        const list = await List.create({ title, ownerId: req.user._id });
        res.status(201).json(list);
    } catch (error) {
        console.log('ERROR WITH SERVER CREATING LIST:', error);
        return res.status(500).json({ message: 'Internal server error!', error })
    }
}

export const getAllLists = async (req, res) => {
    try {
        const lists = await List.find({ ownerId: req.user._id });
        res.status(200).json(lists);
    } catch (error) {
        console.log('ERROR WITH SERVER GETTING LISTS:', error);
        return res.status(500).json({ message: 'Internal server error!', error })
    }
}

export const getSharedLists = async (req, res) => {
    try {
        const sharedLists = await List.find({ sharedWith: req.user._id });
        res.status(200).json(sharedLists);
    } catch (error) {
        console.log('ERROR WITH SERVER GETTING SHARED LISTS:', error);
        return res.status(500).json({ message: 'Internal server error!', error })
    }
}

export const deleteList = async (req, res) => {
    const { id } = req.params;
    try {
        const list = await List.findById(id);
        if (!list) {
            return res.status(404).json({ message: 'List not found!' });
        }
        if (list.ownerId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'You can delete only own lists!' });
        }
        await list.deleteOne();
        await ListItem.deleteMany({ listId: id, ownerId: req.user._id });
        res.status(200).json({ message: `List "${list.title}" and all its list items were deleted successfully!` });

    } catch (error) {
        console.log('ERROR WITH SERVER DELETING LIST:', error);
        return res.status(500).json({ message: 'Internal server error!', error })
    }
}

export const shareList = async (req, res) => {
    const { listId, email } = req.body;
    if (!listId || !email) {
        return res.status(400).json({ message: 'List id and email are required!' });
    }
    try {
        const list = await List.findById(listId);
        if (!list) {
            return res.status(404).json({ message: 'List not found!' });
        }
        if (list.ownerId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'You can share only own lists!' });
        }
        const invitedUser = await User.findOne({ email });

        if (!invitedUser) { return res.status(404).json({ message: 'Invited user not found!' }); }
        if (list.pendingShares.some(p => p.email.toString() === email.toString()) ||
            list.sharedWith.some(id => id.toString() === invitedUser._id.toString())) {
            console.log('EXIST!')
            return res.status(400).json({ message: 'User is already invited!' });
        }
        const token = generateEmailToken(listId, email);
        const baseUrl = process.env.SERVER_URL;
        const acceptLink = `${baseUrl}/list/a/accept/${token}`;
        const declineLink = `${baseUrl}/list/a/decline/${token}`;

        await sendEmail(
            "List Sharing Invitation",
            email,
            process.env.USER_EMAIL,
            "shareList",
            `"List App" <${process.env.USER_EMAIL}>`,
            invitedUser.username,
            req.user.username,
            { acceptLink, declineLink, listTitle: list.title }
        );
        list.pendingShares.push({ email, token });
        await list.save();

        res.status(200).json({ message: `Successfully send email for sharing list with title ${list.title}` });
    } catch (error) {
        console.log('ERROR WITH SERVER SHARING LIST:', error);
        return res.status(500).json({ message: 'Internal server error!', error })
    }
};

export const acceptSharedList = async (req, res) => {
    const { token } = req.params;
    console.log('SHARING LIST TOKEN:', token)
    try {
        const decodedToken = verifyEmailToken(token);
        console.log('SHARING LIST DECODED:', decodedToken)

        if (!decodedToken) {
            return res.status(403).json({ message: 'Invalid share token!' });
        }
        const list = await List.findById(decodedToken.listId);
        console.log('SHARING LIST LIST:', list)

        if (!list) {
            return res.status(404).json({ message: 'List not found!' });
        }
        const pendingIndex = list.pendingShares.findIndex((pending) => pending.token === token && pending.email === decodedToken.email);
        if (pendingIndex === -1) {
            return res.status(400).json({ message: 'Invalid share token!' });
        }
        console.log('SHARED LIST PENDING INDEX:', pendingIndex);
        const user = await User.findOne({ email: decodedToken.email });
        console.log('SHARED LIST USER:', user);
        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }
        list.pendingShares.splice(pendingIndex, 1);
        list.sharedWith.push(user._id);
        await list.save();
        res.status(200).json({ message: `You now have access to list: ${list.title}` });
    } catch (error) {
        console.log('ERROR WITH SERVER ACCEPT SHARED LIST:', error);
        return res.status(500).json({ message: 'Internal server error!', error })
    }
};

export const declineSharedList = async (req, res) => {
    const { token } = req.params;
    try {
        const decodedToken = verifyEmailToken(token);
        if (!decodedToken) {
            return res.status(403).json({ message: 'Invalid share token!' });
        }
        const list = await List.findById(decodedToken.listId);
        if (!list) {
            return res.status(404).json({ message: 'List not found!' });
        }
        const pendingIndex = list.pendingShares.findIndex((pending) => pending.token === token && pending.email === decodedToken.email);
        if (pendingIndex === -1) {
            return res.status(400).json({ message: 'Invalid share token!' });
        }
        list.pendingShares.splice(pendingIndex, 1);
        // const pendingShare = list.pendingShares.find((pending) => pending.token === token && pending.email === decodedToken.email);
        // if (!pendingShare) { return res.status(400).json({ message: 'Invalid share token!' }); }
        // list.pendingShares = list.pendingShares.filter((pending) => pending.email !== decodedToken.email);
        await list.save();
        res.status(200).json({ message: `You successfully decline access to list: ${list.title}` });
    } catch (error) {
        console.log('ERROR WITH SERVER ACCEPT SHARED LIST:', error);
        return res.status(500).json({ message: 'Internal server error!', error })
    }
}