import jwt from 'jsonwebtoken';

export function generateAccessToken(id) {
    const token = jwt.sign({ id }, process.env.JWT_SECRET_ACCESS, {
        expiresIn: '1m'
    });
    return token;
};

export function generateRefreshToken(id) {
    const token = jwt.sign({ id }, process.env.JWT_SECRET_REFRESH, {
        expiresIn: '2m'
    });
    return token;
};
export function verifyAccessToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET_ACCESS)
}

export function verifyRefreshToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET_REFRESH)
}