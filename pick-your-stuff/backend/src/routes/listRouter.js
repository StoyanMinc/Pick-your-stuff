import express from 'express';
import { createList, deleteList, getAllLists } from '../controllers/listController.js';
import { protect } from '../middlewares/protect.js';

const listRouter = express.Router();

listRouter.get('/', protect, getAllLists);
listRouter.post('/', protect, createList);
listRouter.delete('/:id', protect, deleteList);

export default listRouter;