import {UserResponse} from "../mappers";
import {USER_ERRORS} from "../errors";
import {UserSchema, RoleSchema, UserTypeSchema, UserStateSchema} from "../models";
import {UpdateUserDTO} from "../controllers/user/validators/user.update";
import {encrypt} from "../utils";

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

export const findUserById = async (userId: string) => {
    return await UserSchema.findByPk(userId, {
        include: [
            {model: RoleSchema, as: 'role'}
        ]
    });
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

export const updateUser = async (userId: string, updateUserDTO: UpdateUserDTO) => {

    // If the password is updated, encrypt it
    if (updateUserDTO.password) {
        updateUserDTO.password = await encrypt(updateUserDTO.password);
    }

    return await UserSchema.update({
        ...updateUserDTO
    }, {where: {userId}});
}
