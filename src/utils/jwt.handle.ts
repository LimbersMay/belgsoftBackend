import {sign, verify} from "jsonwebtoken";
import {JWT_SECRET} from "./secrets";

export const generateToken = (userId: string) => {
    return sign({userId}, JWT_SECRET, {
        expiresIn: '2d'
    });

}

export const verifyToken = (token: string) => {
    return verify(token, JWT_SECRET);
}
