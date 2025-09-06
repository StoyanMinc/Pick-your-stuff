import { model, Schema, Types } from 'mongoose'

const listSchema = Schema({
    title: {
        type: String,
        required: [true, 'List title is required!']
    },
    ownerId: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const List = model('List', listSchema);

export default List;