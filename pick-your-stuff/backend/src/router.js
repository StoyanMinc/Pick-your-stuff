import express from 'express';
import userRouter from './routes/userRouter.js';
import listRouter from './routes/listRouter.js';
import listItemRouter from './routes/listItemRouter.js';

const router = express.Router();

router.use('/auth', userRouter);
router.use('/list', listRouter);
router.use('/list-item', listItemRouter);

export default router;