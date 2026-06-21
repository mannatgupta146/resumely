import jwt, { JwtPayload } from 'jsonwebtoken';

export const generateToken = (payload: JwtPayload) : string => {
    try {
        return jwt.sign(payload, process.env.JWT_SECRET!, { 
            expiresIn: '1h' 
        });
    } catch (error) {
        console.error("Error generating token:", error);
        throw new Error("Token generation failed");
    }
}

export const verifyToken = (token: string) : any => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET!);
    } catch (error) {
        console.error("Invalid token:", error);
        return null;
    }
}