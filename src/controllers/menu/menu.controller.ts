import {Response} from "express";
import {
    Authorized,
    Body,
    CurrentUser,
    Delete,
    Get,
    JsonController, Params,
    Post,
    Put,
    Res,
    UseBefore
} from "routing-controllers";
import {IsAuthenticated} from "../../middlewares";
import {createMenu, deleteMenu, findAllMenu, updateMenu} from "../../services/menu.service";
import {handleHttp} from "../../utils";
import {MenuErrors} from "../../errors";
import {CreateMenuDTO} from "./validations/menu.create";
import {UpdateMenuDTO, MenuIdDTO} from "./validations/menu.update";
import {UserResponse} from "../../mappers";
import {BranchIdSpecification, CategoryIdSpecification} from "../../specifications";

@JsonController('/menu')
@UseBefore(IsAuthenticated)
export class MenuController {

    @Get('/')
    @Authorized(['ADMIN', 'WAITER'])
    public async getAll(
        @Res() res: Response,
        @CurrentUser() { branchId }: UserResponse
    ) {
        try {
            return await findAllMenu(new BranchIdSpecification(branchId));
        } catch (e) {
            handleHttp(res, MenuErrors.MENU_ERROR_CANNOT_GET_MENUS, e);
        }
    }

    @Get('/foods')
    @Authorized(['ADMIN', 'WAITER'])
    public async getAllFoods(
        @Res() res: Response,
        @CurrentUser() { branchId }: UserResponse,
    ) {
        try {
            return await findAllMenu([
                new BranchIdSpecification(branchId),
                new CategoryIdSpecification('218a7694-bff8-42c7-aa75-e7068d92f938')
            ]);
        } catch (e) {
            handleHttp(res, MenuErrors.MENU_ERROR_CANNOT_GET_MENUS, e);
        }
    }

    @Get('/drinks')
    @Authorized(['ADMIN', 'WAITER'])
    public async getAllDrinks(
        @Res() res: Response,
        @CurrentUser() { branchId }: UserResponse,
    ) {
        try {
            return await findAllMenu([
                new BranchIdSpecification(branchId),
                new CategoryIdSpecification('c1b6913e-78a1-407a-9e4b-49bb007b81c0')
            ]);
        } catch (e) {
            handleHttp(res, MenuErrors.MENU_ERROR_CANNOT_GET_MENUS, e);
        }
    }

    @Post('/')
    @Authorized('ADMIN')
    public async create(
        @Res() res: Response,
        @Body({validate: true}) createMenuDTO: CreateMenuDTO,
        @CurrentUser() { branchId }: UserResponse
    ) {
        try {
            return await createMenu(createMenuDTO, branchId);
        } catch (e) {
            handleHttp(res, MenuErrors.MENU_ERROR_CANNOT_CREATE_MENU, e);
        }
    }

    @Put('/:id')
    @Authorized('ADMIN')
    public async update(
        @Res() res: Response,
        @Params({validate: true}) { id }: MenuIdDTO,
        @Body({validate: true}) updateMenuDTO: UpdateMenuDTO,
        @CurrentUser() { branchId }: UserResponse
    ) {
        try {
            const affectedFields = await updateMenu(id, branchId, updateMenuDTO);
            
            return {
                affectedFields
            }
        } catch (e) {
            handleHttp(res, MenuErrors.MENU_ERROR_CANNOT_UPDATE_MENU, e);
        }
    }

    @Delete('/:id')
    @Authorized('ADMIN')
    public async delete(
        @Res() res: Response,
        @Params({validate: true}) { id }: MenuIdDTO,
        @CurrentUser() { branchId }: UserResponse
    ) {
        try {
            const affectedFields = await deleteMenu(id, branchId);

            return {
                affectedFields
            }
        } catch (e) {
            handleHttp(res, MenuErrors.MENU_ERROR_CANNOT_DELETE_MENU, e);
        }
    }
}
