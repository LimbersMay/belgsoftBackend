import {v4 as uuidv4} from 'uuid';
import {Auth} from "../interfaces";
import {UserSchema} from "../models";
import {UserResponse} from "../mappers";
import {compareHash, encrypt, generateToken} from "../utils";
import {AUTH_ERRORS, USER_ERRORS} from "../errors";
import {RoleSchema, UserTypeSchema, UserStateSchema} from "../models";
export const registerUser = async (authProps: Auth) => {

    // check if user exists
    const userExists = await UserSchema.findOne({
        where: { email: authProps.email }
    });


    if (userExists) return AUTH_ERRORS.AUTH_EMAIL_ALREADY_EXISTS;

    const encryptedPassword = await encrypt(authProps.password);
    const user = await UserSchema.create({
        ...authProps,
        password: encryptedPassword,
        userId: uuidv4(),
    });

    const newUser = await UserSchema.findOne({
        where: {userId: user.userId},
        include: [
            { model: RoleSchema, as: 'role' },
            { model: UserTypeSchema, as: 'userType' },
            { model: UserStateSchema, as: 'userState' }
        ]
    });

    if (!newUser) return AUTH_ERRORS.AUTH_CANNOT_REGISTER_USER;

    await user.save();
    return UserResponse.fromUser(newUser);
}

export const loginUser = async ({ email, password }: { email: string, password: string }) => {

    const user = await UserSchema.findOne({
        where: { email },
        include: [
            { model: RoleSchema, as: 'role' },
            { model: UserTypeSchema, as: 'userType' },
            { model: UserStateSchema, as: 'userState' }
        ]
    });

    if (!user) return USER_ERRORS.USER_NOT_FOUND;

    const isPasswordValid = await compareHash(password, user.password);
    if (!isPasswordValid) return AUTH_ERRORS.AUTH_INCORRECT_PASSWORD;

    const userResponse = UserResponse.fromUser(user);

    const token = generateToken(userResponse);

    return {
        token,
        user: userResponse
    };
}
