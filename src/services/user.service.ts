import {UserResponse} from "../mappers";
import {UserSchema, RoleSchema, UserTypeSchema, UserStateSchema} from "../models";
import {UpdateUserDTO} from "../controllers/user/validators/user.update";
import {encrypt} from "../utils";
import {User} from "../interfaces";
import {
    Specification
} from "../specifications";
import {UserSpecificationBuilder} from "../specifications/sequelize/user-specifications.builder";

type UserSpecification = Specification<User> | Specification<User>[];

// User specification validator
const userSpecificationBuilder = new UserSpecificationBuilder();

export const updateUser = async (updateUserDTO: UpdateUserDTO, specifications: UserSpecification) => {

    // If the password is updated, encrypt it
    if (updateUserDTO.password) {
        updateUserDTO.password = await encrypt(updateUserDTO.password);
    }

    const whereQuery = userSpecificationBuilder.buildWhereClauseFromSpecifications(specifications);

    return await UserSchema.update({
        ...updateUserDTO
    }, {
        where: {
            ...whereQuery
        }
    });
}

export const findUser = async (specification: UserSpecification) => {
    const whereQuery = userSpecificationBuilder.buildWhereClauseFromSpecifications(specification);
    return await UserSchema.findOne({
        where: whereQuery,
        include: [
            {model: RoleSchema, as: 'role'}
        ]
    });
}

export const findAllUsers = async (specification: UserSpecification) => {
    const where = userSpecificationBuilder.buildWhereClauseFromSpecifications(specification);
    const users = await UserSchema.findAll({
        where,
        include: [
            {model: RoleSchema, as: 'role'},
            {model: UserTypeSchema, as: 'userType'},
            {model: UserStateSchema, as: 'userState'}
        ]
    });

    return users.map(user => UserResponse.fromUser(user));
}
