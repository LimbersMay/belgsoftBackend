import {User} from "../interfaces/user.interface";
import {UserSchema} from "../models";

export const createUser = async (user: User) => {
    const userCreated = await UserSchema.create(user);
    await userCreated.save();

    return userCreated;
}

export const getUserById = async (userId: number) => {
    return await UserSchema.findOne({where: {userId}});
}

export const getAllUsers = async () => {
    return await UserSchema.findAll({});
}

export const updateUser = async (userId: string, updatedFields: any) => {
    return await UserSchema.update({
        ...updatedFields
    }, {where: {userId}});
}
