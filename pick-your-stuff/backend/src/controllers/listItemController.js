import ListItem from '../models/ListItem.js'
import List from '../models/List.js'

export const createListItem = async (req, res) => {
    const { title, listId } = req.body;
    if (!title) {
        return res.status(400).json({ message: 'List Item title is required!' });
    }
    if (!listId) {
        return res.status(400).json({ message: 'ListId is required!' });
    }
    try {
        const list = await List.findById(listId);
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

export const updateListItem = async (req, res) => {
    console.log('work')
    const { id } = req.params;
    const { isChecked } = req.body;

    try {
        const updatedItem = await ListItem.findByIdAndUpdate(id, { isChecked: isChecked }, { new: true });
        console.log(updatedItem)
        res.status(200).json(updatedItem);
    } catch (error) {
        console.log('ERROR WITH SERVER CREATING LIST:', error);
        return res.status(500).json({ message: 'Internal server error!', error })
    }
}

export const checkAllItems = async (req, res) => {
    const { id: listId } = req.params; // ✅ take from URL

    try {
        const list = await List.findById(listId);
        if (!list) return res.status(404).json({ message: "List not found!" });
        if (list.ownerId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not allowed to modify this list!" });
        }

        await ListItem.updateMany(
            { listId, ownerId: req.user._id },
            { $set: { isChecked: true } }
        );

        res.status(200).json({ message: "All items checked successfully!" });
    } catch (error) {
        console.log("ERROR CHECKING ALL ITEMS:", error);
        res.status(500).json({ message: "Internal server error!", error });
    }
};

export const uncheckAllItems = async (req, res) => {
    const { id: listId } = req.params; // ✅ take from URL

    try {
        const list = await List.findById(listId);
        if (!list) return res.status(404).json({ message: "List not found!" });
        if (list.ownerId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not allowed to modify this list!" });
        }

        await ListItem.updateMany(
            { listId, ownerId: req.user._id },
            { $set: { isChecked: false } }
        );

        res.status(200).json({ message: "All items unchecked successfully!" });
    } catch (error) {
        console.log("ERROR UNCHECKING ALL ITEMS:", error);
        res.status(500).json({ message: "Internal server error!", error });
    }
};

