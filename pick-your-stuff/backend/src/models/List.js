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
    },
    sharedWith: [
        { type: Types.ObjectId, ref: 'User' }
    ],
    pendingShares: [{
        email: { type: String, required: true },
        token: { type: String, required: true },
    }]
});

const List = model('List', listSchema);

export default List;