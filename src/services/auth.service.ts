import {v4 as uuidv4} from 'uuid';
import {Auth} from "../interfaces";
import {UserSchema} from "../models";
import {UserResponse} from "../mappers";
import {compareHash, encrypt, generateToken} from "../utils";
import {AUTH_ERRORS, USER_ERRORS} from "../errors";

export const registerUser = async (authProps: Auth): Promise<UserResponse> => {

    const encryptedPassword = await encrypt(authProps.password);

    const user = await UserSchema.create({
        ...authProps,
        password: encryptedPassword,
        userId: uuidv4()
    });

    await user.save();
    return UserResponse.fromUser(user);
}

export const loginUser = async ({ email, password }: { email: string, password: string }) => {

    const user = await UserSchema.findOne({ where: { email } });
    if (!user) return USER_ERRORS.USER_NOT_FOUND;

    const isPasswordValid = await compareHash(password, user.password);
    if (!isPasswordValid) return AUTH_ERRORS.AUTH_INCORRECT_PASSWORD;

    const token = generateToken(user.userId);

    return {
        token,
        user: UserResponse.fromUser(user)
    };
}
