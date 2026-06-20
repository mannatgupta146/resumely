import jwt, { JwtPayload } from 'jsonwebtoken';

export const generateToken = (payload: JwtPayload) : string => {
    return jwt.sign(payload, process.env.JWT_SECRET!, { 
        expiresIn: '1h' 
    });
}

export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET!);
    } catch (error) {
        console.error("Invalid token:", error);
        return null;
    }
}