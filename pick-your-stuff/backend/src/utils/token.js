import jwt from 'jsonwebtoken';

export function generateAccessToken(id) {
    const token = jwt.sign({ id }, process.env.JWT_SECRET_ACCESS, {
        expiresIn: '15m'
    });
    return token;
};

export function generateRefreshToken(id) {
    const token = jwt.sign({ id }, process.env.JWT_SECRET_REFRESH, {
        expiresIn: '7d'
    });
    return token;
};

export function generateEmailToken(listId, email) {
    const token = jwt.sign({ listId, email }, process.env.JWT_SECRET_EMAIL, {
        expiresIn: '7d'
    });
    return token;
};

export function verifyAccessToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET_ACCESS);
};

export function verifyRefreshToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET_REFRESH);
};

export function verifyEmailToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET_EMAIL);
};