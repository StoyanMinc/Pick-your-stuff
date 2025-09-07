import express from 'express';
import {
    register,
    login,
    logout,
    getUser,
    refreshTokens,
    changePassword,
    updateUser,
    deleteAccount

} from '../controllers/userController.js';
import { protect } from '../middlewares/protect.js';

const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/logout', logout);
userRouter.get('/get-user', protect, getUser);
userRouter.put('/update-user', protect, updateUser);
userRouter.put('/change-password', protect, changePassword);
userRouter.post('/refresh-tokens', refreshTokens);
userRouter.delete('/delete-account', protect, deleteAccount);

export default userRouter;