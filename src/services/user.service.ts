import {UserResponse} from "../mappers";
import {UserError} from "../errors";
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
        return UserError.USER_NOT_FOUND;
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

export const getAllUsersByAdminId = async (createdByUserId: string) => {

    const users = await UserSchema.findAll({
        where: {createdByUserId},
        include: [
            {model: RoleSchema, as: 'role'},
            {model: UserTypeSchema, as: 'userType'},
            {model: UserStateSchema, as: 'userState'}
        ]
    });

    return users.map(user => UserResponse.fromUser(user));
}

export const findUserByAdminId = async (userId: string, createdByUserId: string) => {
    return await UserSchema.findOne({where: {userId, createdByUserId}});
}

export const updateUser = async (userId: string, adminId: string | undefined, updateUserDTO: UpdateUserDTO) => {

    // If the password is updated, encrypt it
    if (updateUserDTO.password) {
        updateUserDTO.password = await encrypt(updateUserDTO.password);
    }

    const whereQuery: Record<string, string> = {
        userId
    };

    if (adminId) {
        whereQuery['createdByUserId'] = adminId;
    }

    return await UserSchema.update({
        ...updateUserDTO
    }, {
        where: {
            ...whereQuery
        }
    });
}
