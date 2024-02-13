import { Response } from "express";
import {
    Authorized,
    Body,
    Delete,
    Get,
    JsonController,
    Param,
    Params,
    Post,
    Put,
    Res,
    UseBefore
} from "routing-controllers";
import {IsAuthenticated} from "../../../middlewares";
import {createRole, deleteRole, findAllRoles, updateRole} from "../../../services/role.service";
import {RoleError} from "../../../errors/role.error";
import {handleHttp} from "../../../utils";
import {CreateRoleDTO} from "./validators/role.create";
import {RoleIdDTO} from "./validators/role.delete";
import {RoleIdSpecification} from "../../../specifications";
import {UpdateRoleDTO} from "./validators/role.update";

@JsonController('/role')
@UseBefore(IsAuthenticated)
export class RoleController {
    constructor() {}

    @Authorized(['ADMIN', 'SUPER_USER'])
    @Get('/')
    public async getAll(
        @Res() res: Response,
    ) {
        const roles = await findAllRoles();

        if (roles.isOk()) return roles.value;

        return handleHttp(res, RoleError.ROLE_ERROR_CANNOT_GET_ROLES, roles.error, 500);
    }

    @Authorized(['ADMIN', 'SUPER_USER'])
    @Post('/')
    public async create(
        @Res() res: Response,
        @Body() body: CreateRoleDTO
    ) {

        const createRoleResult = await createRole(body);

        if (createRoleResult.isOk()) return createRoleResult.value;

        return handleHttp(res, RoleError.ROLE_ERROR_CANNOT_CREATE_ROLE, createRoleResult.error, 500);
    }

    @Authorized(['ADMIN', 'SUPER_USER'])
    @Put('/:roleId')
    public async update(
        @Res() res: Response,
        @Params({ validate: true }) roleIdDTO: RoleIdDTO,
        @Body() createRoleDTO: UpdateRoleDTO
    ) {

        const createRoleResult = await updateRole(
            new RoleIdSpecification(roleIdDTO.roleId),
            createRoleDTO
        );

        if (createRoleResult.isOk()) return createRoleResult.value;

        return handleHttp(res, RoleError.ROLE_ERROR_CANNOT_CREATE_ROLE, createRoleResult.error, 500);
    }

    @Authorized(['ADMIN', 'SUPER_USER'])
    @Delete('/:roleId')
    public async delete(
        @Res() res: Response,
        @Params({ validate: true }) roleId: RoleIdDTO
    ) {

        const affectedFields = await deleteRole(new RoleIdSpecification(roleId.roleId));

        if (affectedFields.isOk()) return {
            affectedFields: affectedFields.value
        }

        switch (affectedFields.error) {
            case RoleError.ROLE_NOT_UPDATED:
                return handleHttp(res, RoleError.ROLE_NOT_UPDATED, 400);

            default:
                    return handleHttp(res, RoleError.ROLE_ERROR_CANNOT_DELETE_ROLE, affectedFields.error, 500);
        }
    }
}
