import {Response} from "express";
import {
    Authorized,
    Body,
    CurrentUser, Delete,
    Get,
    JsonController,
    Params,
    Post,
    Put,
    Res,
    UseBefore
} from "routing-controllers";
import {IsAuthenticated} from "../../middlewares";
import {handleHttp} from "../../utils";
import {AreaErrors} from "../../errors/area.errors";
import {createArea, deleteArea, findAllAreas, updateArea} from "../../services";
import {UserResponse} from "../../mappers";
import {BranchIdSpecification} from "../../specifications";
import {CreateAreaDTO} from "./validations/area.create";
import {UpdateAreaDTO, UpdateIdDTO} from "./validations/area.update";
import {AreaIdSpecification} from "../../specifications";

@JsonController('/areas')
@UseBefore(IsAuthenticated)
export class AreaController {
    constructor() {
    }

    @Authorized(['ADMIN', 'USER', 'SUPER_USER', 'WAITER'])
    @Get('/')
    public async getAll(@Res() res: Response, @CurrentUser() {branchId}: UserResponse) {

        const result = await findAllAreas(
            new BranchIdSpecification(branchId)
        );

        if (result.isOk()) return result.value;

        return handleHttp(res, AreaErrors.AREA_ERROR_CANNOT_GET_AREAS, result.error);
    }

    @Authorized(['ADMIN', 'SUPER_USER'])
    @Post('/')
    public async create(
        @Res() res: Response,
        @Body({validate: true}) createAreaDTO: CreateAreaDTO,
        @CurrentUser() {branchId}: UserResponse
    ) {
        const result = await createArea(createAreaDTO, branchId);

        if (result.isOk()) return result.value;

        return handleHttp(res, AreaErrors.AREA_ERROR_CANNOT_CREATE_AREA, result.error);
    }

    @Put('/:id')
    @Authorized(['ADMIN', 'SUPER_USER'])
    public async update(
        @Res() res: Response,
        @Params({validate: true}) {id}: UpdateIdDTO,
        @Body({validate: true}) updateAreaDTO: UpdateAreaDTO,
        @CurrentUser() {branchId}: UserResponse
    ) {

        const affectedFieldsResult = await updateArea(updateAreaDTO, [
            new BranchIdSpecification(branchId),
            new AreaIdSpecification(id)
        ]);

        if (affectedFieldsResult.isOk()) return {
            affectedFields: affectedFieldsResult.value
        };

        switch (affectedFieldsResult.error) {

            case AreaErrors.AREA_NOT_UPDATED:
                return handleHttp(res, AreaErrors.AREA_NOT_FOUND, affectedFieldsResult.error);

            default:
                const _exhaustiveCheck: never = affectedFieldsResult.error;
                return handleHttp(res, AreaErrors.AREA_ERROR_CANNOT_UPDATE_AREA, _exhaustiveCheck);
        }

    }

    @Delete('/:id')
    @Authorized(['ADMIN', 'SUPER_USER'])
    public async delete(
        @Res() res: Response,
        @Params({validate: true}) {id}: UpdateIdDTO,
        @CurrentUser() {branchId}: UserResponse
    ) {

        const affectedFieldsResult = await deleteArea([
            new BranchIdSpecification(branchId),
            new AreaIdSpecification(id)
        ])


        if (affectedFieldsResult.isOk()) return {
            affectedFields: affectedFieldsResult.value
        }

        return handleHttp(res, AreaErrors.AREA_ERROR_CANNOT_DELETE_AREA, affectedFieldsResult.error);
    }
}
