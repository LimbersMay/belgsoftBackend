import {sign, verify} from "jsonwebtoken";
import {JWT_SECRET} from "./secrets";
import {UserResponse} from "../mappers";

export const generateToken = (user: UserResponse) => {
    return sign({ user }, JWT_SECRET, {
        expiresIn: '2d'
    });

}

export const verifyToken = (token: string) => {
    return verify(token, JWT_SECRET);
}
