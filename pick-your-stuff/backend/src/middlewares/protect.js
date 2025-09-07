import User from "../models/User.js";
import { verifyAccessToken } from "../utils/token.js";

export const protect = async (req, res, next) => {
    try {
        const accessToken = req.headers.authorization;
        if (!accessToken) {
            return res.status(401).json({ message: 'Not authorized, please login!' });
        }
        const decodedToken = verifyAccessToken(accessToken);
        if (!decodedToken) {
            return res.status(403).json({ message: 'Invalid token! Please login again!' });
        }
        const user = await User.findById(decodedToken.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }
        req.user = user;
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Access token expired" });
        }
        if (error.name === "JsonWebTokenError") {
            return res.status(403).json({ message: "Invalid token" });
        }
        console.log('ERROR PROTECT MIDDLEWARE:', error);
        res.status(500).json({ message: 'Internal server error!' });
    }
};