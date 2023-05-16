import {UserResponse} from "../mappers";
import {USER_ERRORS} from "../errors";
import {UserSchema, RoleSchema, UserTypeSchema, UserStateSchema} from "../models";

export const getUserById = async (userId: string) => {
    const user = await UserSchema.findOne(
        {
            where: {userId},
            include: [
                {model: RoleSchema, as: 'role'},
                {model: UserTypeSchema, as: 'userType'},
                {model: UserStateSchema, as: 'userState'}
            ]
        });

    if (!user) {
        return USER_ERRORS.USER_NOT_FOUND;
    }

    return UserResponse.fromUser(user);
}

export const findUserByEmail = async (email: string) => {
    return await UserSchema.findOne({where: {email}});
}

export const getAllUsers = async () => {
    const users = await UserSchema.findAll({
        include: [
            {model: RoleSchema, as: 'role'},
            {model: UserTypeSchema, as: 'userType'},
            {model: UserStateSchema, as: 'userState'}
        ]
    });

    return users.map(user => UserResponse.fromUser(user));
}

export const updateUser = async (userId: string, updatedFields: any) => {
    return await UserSchema.update({
        ...updatedFields
    }, {where: {userId}});
}
