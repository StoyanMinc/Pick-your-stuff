import ListItem from '../models/ListItem.js'
import List from '../models/List.js'

export const createListItem = async (req, res) => {
    const { title, listId } = req.body;
    console.log(listId)
    console.log(req.user)
    if (!title) {
        return res.status(400).json({ message: 'List Item title is required!' });
    }
    if (!listId) {
        return res.status(400).json({ message: 'ListId is required!' });
    }
    try {
        const list = await List.findById(listId);
        console.log(list)
        if (!list) {
            return res.status(404).json({ message: "List not found!" });
        }
        if (list.ownerId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You can add list items only to your own lists!" });
        }
        const listItem = await ListItem.create({ title, listId, ownerId: req.user._id });
        res.status(201).json(listItem);
    } catch (error) {
        console.log('ERROR WITH SERVER CREATING LIST:', error);
        return res.status(500).json({ message: 'Internal server error!', error })
    }
}

export const getAllListsItems = async (req, res) => {
    const { listId } = req.query;
    console.log(listId)
    console.log(req.user)
    try {
        const listItems = await ListItem.find({ ownerId: req.user._id, listId: listId });
        res.status(200).json(listItems);
    } catch (error) {
        console.log('ERROR WITH SERVER GETTING LISTS:', error);
        return res.status(500).json({ message: 'Internal server error!', error })
    }
}

export const deleteListItem = async (req, res) => {
    const { id } = req.params;
    console.log(id)
    try {
        const listItem = await ListItem.findById(id);
        if (!listItem) {
            return res.status(404).json({ message: 'List item not found!' });
        }
        if (listItem.ownerId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'You can delete only own list items!' });
        }
        await listItem.deleteOne();
        res.status(200).json({ message: `List item "${listItem.title}" is deleted successfully!` });

    } catch (error) {
        console.log('ERROR WITH SERVER DELETING LIST:', error);
        return res.status(500).json({ message: 'Internal server error!', error })
    }
}