import { model, Schema, Types } from 'mongoose'

const listItemSchema = Schema({
    title: {
        type: String,
        required: [true, 'List title is required!']
    },
    isChecked: {
        type: Boolean,
        default: false
    },
    ownerId: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    listId: {
        type: Types.ObjectId,
        ref: 'List',
        required: true
    }
});

const ListItem = model('ListItem', listItemSchema);

export default ListItem;