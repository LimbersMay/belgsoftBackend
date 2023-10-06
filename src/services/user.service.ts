import {UserResponse} from "../mappers";
import {UserSchema, RoleSchema, UserTypeSchema, UserStateSchema} from "../models";
import {UpdateUserDTO} from "../controllers/user/validators/user.update";
import {encrypt} from "../utils";
import {
    Criteria, SequelizeSpecificationBuilder,
} from "../specifications";

// User specification validator
const specificationBuilder = new SequelizeSpecificationBuilder();

export const updateUser = async (updateUserDTO: UpdateUserDTO, specifications: Criteria) => {

    // If the password is updated, encrypt it
    if (updateUserDTO.password) {
        updateUserDTO.password = await encrypt(updateUserDTO.password);
    }

    const whereQuery = specificationBuilder.buildWhereClauseFromSpecifications(specifications);

    return await UserSchema.update({
        ...updateUserDTO
    }, {
        where: {
            ...whereQuery
        }
    });
}

export const findUser = async (specification: Criteria) => {
    const whereQuery = specificationBuilder.buildWhereClauseFromSpecifications(specification);
    return await UserSchema.findOne({
        where: whereQuery,
        include: [
            {model: RoleSchema, as: 'role'}
        ]
    });
}

export const findAllUsers = async (specification: Criteria) => {
    const where = specificationBuilder.buildWhereClauseFromSpecifications(specification);
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
