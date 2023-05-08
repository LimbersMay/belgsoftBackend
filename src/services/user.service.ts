import {UserSchema} from "../models";
import {UserResponse} from "../mappers";
import {USER_ERRORS} from "../errors";

export const getUserById = async (userId: number) => {
    const user = await UserSchema.findOne({where: {userId}});

    if (!user) {
        return USER_ERRORS.USER_NOT_FOUND;
    }

    return UserResponse.fromUser(user);
}

export const getAllUsers = async () => {
    const users = await UserSchema.findAll({});
    return users.map(user => UserResponse.fromUser(user));
}

export const updateUser = async (userId: string, updatedFields: any) => {
    return await UserSchema.update({
        ...updatedFields
    }, {where: {userId}});
}
