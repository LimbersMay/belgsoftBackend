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
import {Response} from "express";
import {AreaErrors} from "../../errors/area.errors";
import {createArea, deleteArea, findAllAreas, updateArea} from "../../services/area.service";
import {UserResponse} from "../../mappers";
import {BranchIdSpecification} from "../../specifications";
import {CreateAreaDTO} from "./validations/area.create";
import {UpdateAreaDTO, UpdateIdDTO} from "./validations/area.update";
import {AreaIdSpecification} from "../../specifications/area.specification";

@JsonController('/areas')
@UseBefore(IsAuthenticated)
export class AreaController {
    constructor() {
    }

    @Get('/')
    @Authorized(['ADMIN', 'USER', 'SUPER_USER'])
    public async getAll(@Res() res: Response, @CurrentUser() {branchId}: UserResponse) {
        try {
            return await findAllAreas(new BranchIdSpecification(branchId));
        } catch (e) {
            return handleHttp(res, AreaErrors.AREA_ERROR_CANNOT_GET_AREAS, e);
        }
    }

    @Post('/')
    @Authorized(['ADMIN', 'SUPER_USER'])
    public async create(
        @Res() res: Response,
        @Body({validate: true}) createAreaDTO: CreateAreaDTO,
        @CurrentUser() {branchId}: UserResponse
    ) {
        try {
            return await createArea(createAreaDTO, branchId);
        } catch (e) {
            return handleHttp(res, AreaErrors.AREA_ERROR_CANNOT_CREATE_AREA, e);
        }
    }

    @Put('/:id')
    @Authorized(['ADMIN', 'SUPER_USER'])
    public async update(
        @Res() res: Response,
        @Params({validate: true}) {id}: UpdateIdDTO,
        @Body({validate: true}) updateAreaDTO: UpdateAreaDTO,
        @CurrentUser() {branchId}: UserResponse
    ) {

        try {
            const affectedFields = await updateArea(updateAreaDTO, [
                new BranchIdSpecification(branchId),
                new AreaIdSpecification(id)
            ]);

            return {
                affectedFields
            }

        } catch (e) {
            return handleHttp(res, AreaErrors.AREA_ERROR_CANNOT_UPDATE_AREA, e);
        }
    }

    @Delete('/:id')
    @Authorized(['ADMIN', 'SUPER_USER'])
    public async delete(
        @Res() res: Response,
        @Params({validate: true}) {id}: UpdateIdDTO,
        @CurrentUser() {branchId}: UserResponse
    ) {
        try {

            const affectedFields = await deleteArea([
                new BranchIdSpecification(branchId),
                new AreaIdSpecification(id)
            ]);

            return {
                affectedFields
            }
        } catch (e) {
            return handleHttp(res, AreaErrors.AREA_ERROR_CANNOT_DELETE_AREA, e);
        }
    }
}
