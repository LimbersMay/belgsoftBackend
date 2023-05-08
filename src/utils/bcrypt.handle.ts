import {compare, hash} from "bcryptjs";

export const encrypt = async (password: string) => {
    return await hash(password, 8);
}

export const compareHash = async (password: string, passwordHashed: string) => {
    return await compare(password, passwordHashed);
}
