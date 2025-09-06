import express from 'express';
import userRouter from './routes/userRouter.js';

const router = express.Router();

router.use('/auth', userRouter);

export default router;