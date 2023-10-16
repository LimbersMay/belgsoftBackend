import {Err, Ok, Result} from "ts-results-es";
import {UserResponse} from "../mappers";
import {UserSchema, RoleSchema, UserTypeSchema, UserStateSchema} from "../models";
import {UpdateUserDTO} from "../controllers/user/validators/user.update";
import {encrypt} from "../utils";
import {
    Criteria, SequelizeSpecificationBuilder,
} from "../specifications";
import {UserError} from "../errors";

// User specification validator
const specificationBuilder = new SequelizeSpecificationBuilder();

type UserUpdateErrors = UserError.USER_NOT_UPDATED | UserError.USER_ERROR_CANNOT_UPDATE_USER;

export const updateUser = async (updateUserDTO: UpdateUserDTO, specifications: Criteria): Promise<Result<[number], UserUpdateErrors>> => {

    // If the password is updated, encrypt it
    if (updateUserDTO.password) {
        updateUserDTO.password = await encrypt(updateUserDTO.password);
    }

    const whereQuery = specificationBuilder.buildWhereClauseFromSpecifications(specifications);

    const result = await UserSchema.update({
        ...updateUserDTO
    }, {
        where: {
            ...whereQuery
        }
    });

    if (result[0] === 0) return Err(UserError.USER_NOT_UPDATED);

    return Ok(result);
}

type UserFinderErrors = UserError.USER_NOT_FOUND | UserError.USER_ERROR_CANNOT_GET_USER;

export const findUser = async (specification: Criteria): Promise<Result<UserSchema, UserFinderErrors>> => {

    const whereQuery = specificationBuilder.buildWhereClauseFromSpecifications(specification);

    const user = await UserSchema.findOne({
        where: whereQuery,
        include: [
            {model: RoleSchema, as: 'role'}
        ]
    });

    if (!user) return Err(UserError.USER_NOT_FOUND);
    return Ok(user);

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
