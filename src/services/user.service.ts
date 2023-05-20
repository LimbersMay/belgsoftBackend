import {Op, WhereOptions} from "sequelize";
import {UserResponse} from "../mappers";
import {UserSchema, RoleSchema, UserTypeSchema, UserStateSchema} from "../models";
import {UpdateUserDTO} from "../controllers/user/validators/user.update";
import {encrypt} from "../utils";
import {User} from "../interfaces";
import {
    AndSpecification,
    NotSpecification,
    OrSpecification,
    Specification,

    CreatedByAdminIdSpecification,
    UserEmailSpecification,
    UserIdSpecification
} from "../specifications";

type UserSpecification = Specification<User> | Specification<User>[];

export const updateUser = async (updateUserDTO: UpdateUserDTO, specifications: UserSpecification) => {

    // If the password is updated, encrypt it
    if (updateUserDTO.password) {
        updateUserDTO.password = await encrypt(updateUserDTO.password);
    }

    const whereQuery = buildWhereClauseFromSpecifications(specifications);

    return await UserSchema.update({
        ...updateUserDTO
    }, {
        where: {
            ...whereQuery
        }
    });
}

export const findUser = async (specification: UserSpecification) => {
    const whereQuery = buildWhereClauseFromSpecifications(specification);
    return await UserSchema.findOne({
        where: whereQuery,
        include: [
            {model: RoleSchema, as: 'role'}
        ]
    });
}

export const findUsers = async (specification: UserSpecification) => {
    const where = buildWhereClauseFromSpecifications(specification);
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

const buildWhereClauseFromSpecifications = (specifications: UserSpecification) => {
    const where: WhereOptions = {};

    // if we get a single specification, convert it to an array
    const specs = Array.isArray(specifications) ? specifications : [specifications];

    for (const specification of specs) {
        const clause = buildWhereClauseFromSpecification(specification);
        Object.assign(where, clause);
    }

    return where;
}

const buildComplexSpecification = <T>(specification: Specification<T>): WhereOptions<T> => {
    // If you have complex specifications, you can use the following
    if (specification instanceof AndSpecification) {
        const oneClause = buildWhereClauseFromSpecification(specification.one);
        const otherClause = buildWhereClauseFromSpecification(specification.other);
        return { [Op.and]: [oneClause, otherClause] };
    } else if (specification instanceof OrSpecification) {
        const oneClause = buildWhereClauseFromSpecification(specification.one);
        const otherClause = buildWhereClauseFromSpecification(specification.other);
        return { [Op.or]: [oneClause, otherClause] };
    } else if (specification instanceof NotSpecification) {
        const wrappedClause = buildWhereClauseFromSpecification(specification.wrapped);
        return { [Op.not]: wrappedClause };
    }

    // if specification is not recognized, return empty where clause
    return {};
}

const buildWhereClauseFromSpecification = (specification: Specification<User>): WhereOptions<User> => {
    // build the where clause for the specification

    if (specification instanceof UserIdSpecification) {
        return {userId: specification.userId};
    } else if (specification instanceof UserEmailSpecification) {
        return {email: specification.email};
    } else if (specification instanceof CreatedByAdminIdSpecification) {
        return {createdByUserId: specification.adminId};
    }

    // If you have complex specifications, you can use the following
    return buildComplexSpecification<User>(specification);
}