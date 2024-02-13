import {Err, Ok, Result} from "ts-results-es";
import {RoleResponse} from "../mappers/role.response";
import {RoleError} from "../errors/role.error";
import {RoleSchema} from "../models";
import {promiseHandler} from "../helpers";
import {CreateRoleDTO} from "../controllers/rbac/role/validators/role.create";
import {v4 as uuidv4} from 'uuid';
import {Criteria, SequelizeSpecificationBuilder} from "../specifications";

const specificationBuilder = new SequelizeSpecificationBuilder();

export const findAllRoles = async (): Promise<Result<RoleResponse[], RoleError.ROLE_ERROR_CANNOT_GET_ROLES>> => {
    const roles = await promiseHandler(
        RoleSchema.findAll()
    );

    if (roles.isErr()) {
        return Err(RoleError.ROLE_ERROR_CANNOT_GET_ROLES);
    }

    return Ok(roles.value.map(item => RoleResponse.fromRole(item)));
}

export const findOneRole = async (specifications: Criteria): Promise<RoleSchema | null> => {

    const whereQuery = specificationBuilder.buildWhereClauseFromSpecifications(specifications);

    return await RoleSchema.findOne({
        where: whereQuery
    });
}

export const createRole = async (createRoleDTO: CreateRoleDTO): Promise<Result<RoleResponse, RoleError.ROLE_ERROR_CANNOT_CREATE_ROLE>> => {

    const role = await promiseHandler(
        RoleSchema.create({
            ...createRoleDTO,
            roleId: uuidv4(),
        })
    );

    if (role.isErr()) {
        return Err(RoleError.ROLE_ERROR_CANNOT_CREATE_ROLE);
    }

    return Ok(RoleResponse.fromRole(role.value));
}

export const updateRole = async (specifications: Criteria, createRoleDTO: CreateRoleDTO): Promise<Result<number, RoleError.ROLE_NOT_UPDATED>> => {
        const whereQuery = specificationBuilder.buildWhereClauseFromSpecifications(specifications);

        const role = await promiseHandler(
            RoleSchema.update(
                {
                    ...createRoleDTO,
                },
                {
                    where: whereQuery
                }
            )
        );

        if (role.isErr()) return Err(RoleError.ROLE_NOT_UPDATED);

        if (role.value[0] === 0) return Err(RoleError.ROLE_NOT_UPDATED);

        return Ok(role.value[0]);
}

export const deleteRole = async (specifications: Criteria): Promise<Result<number, RoleError.ROLE_NOT_UPDATED>> => {

    const whereQuery = specificationBuilder.buildWhereClauseFromSpecifications(specifications);

    const role = await promiseHandler(
        RoleSchema.destroy({
            where: whereQuery
        })
    );

    if (role.isErr()) return Err(role.error);

    if (role.value === 0) return Err(RoleError.ROLE_NOT_UPDATED);

    return Ok(role.value);
}
