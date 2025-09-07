import express from 'express';
import userRouter from './routes/userRouter.js';
import listRouter from './routes/listRouter.js';

const router = express.Router();

router.use('/auth', userRouter);
router.use('/list', listRouter);

export default router;