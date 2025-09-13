import express from 'express';
import { protect } from '../middlewares/protect.js';
import { checkAllItems, createListItem, deleteListItem, getAllListsItems, getAllSharedListsItems, uncheckAllItems, updateListItem } from '../controllers/listItemController.js';

const listItemRouter = express.Router();

listItemRouter.get('/', protect, getAllListsItems);
listItemRouter.post('/', protect, createListItem);
listItemRouter.get('/shared', protect, getAllSharedListsItems);
listItemRouter.put('/:id', protect, updateListItem);
listItemRouter.delete('/:id', protect, deleteListItem);
listItemRouter.patch('/check-all/:id', protect, checkAllItems);
listItemRouter.patch('/uncheck-all/:id', protect, uncheckAllItems);

export default listItemRouter;