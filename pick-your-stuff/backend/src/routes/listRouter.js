import express from 'express';
import {
    acceptSharedList,
    createList,
    declineSharedList,
    deleteList,
    getAllLists,
    shareList
} from '../controllers/listController.js';
import { protect } from '../middlewares/protect.js';

const listRouter = express.Router();

listRouter.get('/', protect, getAllLists);
listRouter.post('/', protect, createList);
listRouter.delete('/:id', protect, deleteList);
listRouter.post('/share', protect, shareList);
listRouter.get('/accept-list:token', acceptSharedList);
listRouter.get('/decline-list:token', declineSharedList);


export default listRouter;