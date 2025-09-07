import express from 'express';
import { protect } from '../middlewares/protect.js';
import { createListItem, deleteListItem, getAllListsItems } from '../controllers/listItemController.js';

const listItemRouter = express.Router();

listItemRouter.get('/', protect, getAllListsItems);
listItemRouter.post('/', protect, createListItem);
listItemRouter.delete('/:id', protect, deleteListItem);

export default listItemRouter;