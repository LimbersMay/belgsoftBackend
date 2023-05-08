import {v4 as uuidv4 } from 'uuid';
import bcryptjs from 'bcryptjs';
import {Auth} from "../interfaces/auth.interface";
import {UserSchema} from "../models";

export const registerUser = async (authProps: Auth): Promise<UserSchema> => {

    const salt = bcryptjs.genSaltSync();
    const encryptedPassword = await bcryptjs.hash(authProps.password, salt);

    const user = await UserSchema.create({
        ...authProps,
        password: encryptedPassword,
        userId: uuidv4()
    });

    await user.save();
    return user;
}

export const loginUser = async ({ email, password }: { email: string, password: string }) => {

}
