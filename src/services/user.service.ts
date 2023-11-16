import {Err, Ok, Result} from "ts-results-es";
import {UserResponse} from "../mappers";
import {UserSchema, RoleSchema, UserTypeSchema, UserStateSchema} from "../models";
import {UpdateUserDTO} from "../controllers/user/validators/user.update";
import {encrypt} from "../utils";
import {
    Criteria, SequelizeSpecificationBuilder,
} from "../specifications";
import {UserError} from "../errors";
import {promiseHandler} from "../helpers";

// User specification validator
const specificationBuilder = new SequelizeSpecificationBuilder();

type UserFinderErrors = UserError.USER_NOT_FOUND | UserError.USER_ERROR_CANNOT_GET_USER;

export const findUser = async (specification: Criteria): Promise<Result<UserSchema, UserFinderErrors>> => {

    const whereQuery = specificationBuilder.buildWhereClauseFromSpecifications(specification);

    const user = await promiseHandler(
        UserSchema.findOne({
            where: whereQuery,
            include: [
                {model: RoleSchema, as: 'role'}
            ]
        })
    );

    if (user.isErr()) return Err(user.error);

    if (!user.value) return Err(UserError.USER_NOT_FOUND);

    return Ok(user.value);
}

export const findAllUsers = async (specification: Criteria): Promise<Result<UserResponse[], Error>> => {
    const where = specificationBuilder.buildWhereClauseFromSpecifications(specification);

    const users = await promiseHandler(
        UserSchema.findAll({
            where,
            include: [
                {model: RoleSchema, as: 'role'},
                {model: UserTypeSchema, as: 'userType'},
                {model: UserStateSchema, as: 'userState'}
            ]
        })
    );

    if (users.isErr()) return Err(users.error);

    return Ok(
        users.value.map(user => UserResponse.fromUser(user))
    );
}

export const updateUser = async (updateUserDTO: UpdateUserDTO, specifications: Criteria): Promise<Result<number, UserError.USER_NOT_UPDATED>> => {

    // If the password is updated, encrypt it
    if (updateUserDTO.password) {
        updateUserDTO.password = await encrypt(updateUserDTO.password);
    }

    const whereQuery = specificationBuilder.buildWhereClauseFromSpecifications(specifications);

    const result = await promiseHandler(
        UserSchema.update({
            ...updateUserDTO
        }, {
            where: {
                ...whereQuery
            }
        })
    );

    if (result.isErr()) return Err(result.error);

    if (result.value[0] === 0) return Err(UserError.USER_NOT_UPDATED);

    return Ok(result.value[0]);
}

export const deleteUser = async (specifications: Criteria): Promise<Result<number, UserError.USER_ERROR_CANNOT_DELETE_USER>> => {

    const whereQuery = specificationBuilder.buildWhereClauseFromSpecifications(specifications);

    const result = await promiseHandler(
        UserSchema.update({
            userStateId: '4'
        }, {
            where: whereQuery
        })
    );

    if (result.isErr()) return Err(result.error);

    if (result.value[0] === 0) return Err(UserError.USER_ERROR_CANNOT_DELETE_USER);

    return Ok(result.value[0]);
}
