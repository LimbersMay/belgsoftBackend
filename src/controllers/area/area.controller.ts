import {Authorized, Body, CurrentUser, Get, JsonController, Post, Res, UseBefore} from "routing-controllers";
import {IsAuthenticated} from "../../middlewares";
import {handleHttp} from "../../utils";
import {Response} from "express";
import {AreaErrors} from "../../errors/area.errors";
import {createArea, findAllAreas} from "../../services/area.service";
import {UserResponse} from "../../mappers";
import {BranchIdSpecification} from "../../specifications";
import {CreateAreaDTO} from "./validations/area.create";

@JsonController('/area')
@UseBefore(IsAuthenticated)
export class AreaController {
    constructor() {}

    @Get('/')
    @Authorized(['ADMIN', 'USER', 'SUPER_USER'])
    public async getAll(@Res() res: Response, @CurrentUser() { branchId }: UserResponse) {
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
        @CurrentUser() { branchId }: UserResponse
    ) {
        try {
            return await createArea(createAreaDTO, branchId);
        } catch (e) {
            return handleHttp(res, AreaErrors.AREA_ERROR_CANNOT_CREATE_AREA, e);
        }
    }
}
