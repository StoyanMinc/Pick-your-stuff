import List from '../models/List.js';
import ListItem from '../models/ListItem.js'

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