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

const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/logout', logout);
userRouter.get('/get-user', getUser);
userRouter.put('/update-user', updateUser);
userRouter.put('/change-password', changePassword);
userRouter.post('/refresh-tokens', refreshTokens);
userRouter.delete('/delete-account', deleteAccount);

export default userRouter;