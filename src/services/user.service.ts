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
import sequelize from "../models/init";

// User specification validator
const specificationBuilder = new SequelizeSpecificationBuilder();

type UserFinderErrors = UserError.USER_NOT_FOUND | UserError.USER_ERROR_CANNOT_GET_USER;

export const findUser = async (specification: Criteria): Promise<Result<UserSchema, UserFinderErrors>> => {

    const whereQuery = specificationBuilder.buildWhereClauseFromSpecifications(specification);

    const user = await promiseHandler(
        UserSchema.findOne({
            where: whereQuery,
            include: [
                {model: RoleSchema, as: 'role'},
                {model: UserTypeSchema, as: 'userType'},
                {model: UserStateSchema, as: 'userState'}
            ]
        })
    );

    if (user.isErr()) return Err(user.error);

    if (!user.value) return Err(UserError.USER_NOT_FOUND);

    return Ok(user.value);
}

export const findAllUsers = async (): Promise<Result<any[], Error>> => {

    const response = await sequelize.query("CALL spGetAllUsers()");

    if (!response) return Err(new Error('No users found'));

    return Ok(response);
}

export const updateUser = async (updateUserDTO: UpdateUserDTO, specifications: Criteria): Promise<Result<UserResponse, UserError.USER_NOT_UPDATED>> => {

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

    const updatedUser = await findUser(specifications)

    if (updatedUser.isErr()) return Err(UserError.USER_NOT_UPDATED);
    if (result.isErr()) return Err(result.error);

    if (result.value[0] === 0) return Err(UserError.USER_NOT_UPDATED);

    return Ok(UserResponse.fromUser(updatedUser.value));
}

export const deleteUser = async (specifications: Criteria): Promise<Result<number, UserError.USER_ERROR_CANNOT_DELETE_USER>> => {

    const whereQuery = specificationBuilder.buildWhereClauseFromSpecifications(specifications);

    const result = await promiseHandler(
        UserSchema.destroy({
            where: {
                ...whereQuery
            }
        })
    );

    if (result.isErr()) return Err(result.error);

    if (result.value === 0) return Err(UserError.USER_ERROR_CANNOT_DELETE_USER);

    return Ok(result.value);
}
