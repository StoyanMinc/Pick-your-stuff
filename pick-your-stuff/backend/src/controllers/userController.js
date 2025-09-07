import bcrypt from 'bcrypt';

import User from "../models/User.js";
import List from '../models/List.js';
import ListItem from '../models/ListItem.js';

import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../utils/token.js";

export const register = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'All fields are required!' });
    }
    if (username.length < 3) {
        return res.status(400).json({ message: 'Username must be at least 3 characters long!' });
    }
    if (password.length < 3) {
        return res.status(400).json({ message: 'Password must be at least 3 characters long!' });
    }
    try {
        const isExist = await User.findOne({ username });
        if (isExist) {
            return res.status(400).json({ message: 'User already exist!' });
        };
        const userData = await User.create({ username, password });
        const accessToken = generateAccessToken(userData._id);
        const refreshToken = generateRefreshToken(userData._id);
        userData.refreshToken = refreshToken;
        await userData.save();

        res.status(201).json({
            _id: userData._id,
            username: userData.username,
            accessToken,
            refreshToken
        });

    } catch (error) {
        console.log('ERROR WITH SERVER CREATING USER:', error);
        return res.status(500).json({ message: 'Internal server error!' })
    }
};

export const login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'All fields are required!' });
    }

    try {
        const existingUser = await User.findOne({ username });
        if (!existingUser) {
            return res.status(400).json({ message: 'Invalid username or password!' });
        }

        const isPasswordMatch = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: 'Invalid username or password!' });
        }
        const accessToken = generateAccessToken(existingUser._id);
        const refreshToken = generateRefreshToken(existingUser._id);
        existingUser.refreshToken = refreshToken;
        await existingUser.save();

        res.status(201).json({
            _id: existingUser._id,
            username: existingUser.username,
            accessToken,
            refreshToken
        });

    } catch (error) {
        console.log('ERROR WITH SERVER LOGIN USER:', error);
        return res.status(500).json({ message: 'Internal server error!' })
    }
};

export const logout = (req, res) => {
    res.status(200).json({ message: 'Logout successfully!' });
};

export const getUser = async (req, res) => {
    try {
        const existUser = await User.findById(req.user._id).select('-password');
        if (!existUser) {
            return res.status(404).json({ message: 'User not found!' });
        }
        res.status(200).json(existUser);
    } catch (error) {
        console.log('ERROR WITH SERVER GETTING USER:', error);
        return res.status(500).json({ message: 'Internal server error!' })
    }
};

export const updateUser = async (req, res) => {
    try {
        const { username } = req.body;
        const updatedUser = await User.findByIdAndUpdate(req.user._id, { username }, { new: true }).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found!' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.log('ERROR WITH SERVER UPDATE USER:', error);
        return res.status(500).json({ message: 'Internal server error!' })
    }
};

export const changePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
        return res.status(400).json({ message: 'All fields are required!' });
    }
    try {
        const existUser = await User.findById(req.user._id);
        if (!existUser) {
            return res.status(404).json({ message: 'User not found!' });
        }

        const isPasswordValid = await bcrypt.compare(currentPassword, existUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid current password!' });
        };

        existUser.password = newPassword;
        await existUser.save();
        res.status(200).json({ message: 'Change password successfully!' });
    } catch (error) {
        console.log('ERROR CHANGE PASSWORD:', error);
        res.status(500).json({ message: 'Internal server error!' });
    }
};

export const deleteAccount = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.user._id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found!' });
        }

        await List.deleteMany({ ownerId: req.user._id });
        await ListItem.deleteMany({ ownerId: req.user._id });

        res.status(200).json({ message: 'Account deleted successfully!' });
    } catch (error) {
        console.log('ERROR DELETE ACCOUNT:', error);
        res.status(500).json({ message: 'Internal server error!' });
    }
};

export const refreshTokens = async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        return res.status(401).json({ message: "No refresh token provided!" });
    }
    try {
        const decoded = verifyRefreshToken(refreshToken);
        const user = await User.findById(decoded.id);
        if (!user || user.refreshToken !== refreshToken) {
            return res.status(403).json({ message: "Invalid refresh token" });
        }
        const newAccessToken = generateAccessToken(decoded.id);
        const newRefreshToken = generateRefreshToken(decoded.id);

        user.refreshToken = newRefreshToken;
        await user.save();
        return res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
    } catch (err) {
        console.error("ERROR REFRESHING TOKENS:", err);
        return res.status(403).json({ message: "Invalid or expired refresh token!" });
    }
};
