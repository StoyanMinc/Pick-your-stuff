import express from 'express';
import {
    acceptSharedList,
    createList,
    declineSharedList,
    deleteList,
    getAllLists,
    getSharedLists,
    shareList
} from '../controllers/listController.js';
import { protect } from '../middlewares/protect.js';

const listRouter = express.Router();

listRouter.get('/', protect, getAllLists);
listRouter.get('/shared', protect, getSharedLists);
listRouter.post('/', protect, createList);
listRouter.delete('/:id', protect, deleteList);
listRouter.post('/share', protect, shareList);
listRouter.get('/accept-list/:token', acceptSharedList);
listRouter.get('/decline-list/:token', declineSharedList);
listRouter.get('/a/:action/:token', (req, res) => {
    const clientUrl = process.env.CLIENT_URL;

    const { action, token } = req.params;
    let appLink;
    if (action === 'accept') appLink = `${clientUrl}://shared-list/accept/${token}`;
    else if (action === 'decline') appLink = `${clientUrl}://shared-list/decline/${token}`;
    else return res.status(400).send('Invalid action');
    res.redirect(appLink);
});


export default listRouter;