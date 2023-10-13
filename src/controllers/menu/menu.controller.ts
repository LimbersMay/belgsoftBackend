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
import {createMenu, deleteMenu, findAllMenu, findOneMenu, updateMenu} from "../../services/menu.service";
import {handleHttp} from "../../utils";
import {MenuErrors} from "../../errors";
import {CreateMenuDTO} from "./validations/menu.create";
import {UpdateMenuDTO, MenuIdDTO} from "./validations/menu.update";
import {UserResponse} from "../../mappers";
import {BranchIdSpecification, CategoryIdSpecification, MenuIdSpecification} from "../../specifications";

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
                new CategoryIdSpecification('da47c63f-196a-4240-bf58-846fd7f0931d')
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

    @Get('/desserts')
    @Authorized(['ADMIN', 'WAITER'])
    public async getAllDesserts(
        @Res() res: Response,
        @CurrentUser() { branchId }: UserResponse,
    ) {
        try {
            return await findAllMenu([
                new BranchIdSpecification(branchId),
                new CategoryIdSpecification('5ff6a9c3-bfb4-4269-b8d6-22f620414199')
            ]);
        } catch (e) {
            handleHttp(res, MenuErrors.MENU_ERROR_CANNOT_GET_MENUS, e);
        }
    }

    @Get('/:id')
    @Authorized(['ADMIN', 'WAITER'])
    public async getById(
        @Res() res: Response,
        @Params({validate: true}) { id: menuId }: MenuIdDTO,
        @CurrentUser() { branchId }: UserResponse
    ) {
        try {
            const menu = await findOneMenu([
                new BranchIdSpecification(branchId),
                new MenuIdSpecification(menuId)
            ]);

            if (typeof menu === "string") {
                return handleHttp(res, MenuErrors.MENU_NOT_FOUND);
            }

            return menu;
        } catch (e) {
            return handleHttp(res, MenuErrors.MENU_ERROR_CANNOT_GET_MENUS, e);
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
        @Params({validate: true}) { id: menuId }: MenuIdDTO,
        @Body({validate: true}) updateMenuDTO: UpdateMenuDTO,
        @CurrentUser() { branchId }: UserResponse
    ) {
        try {
            const affectedFields = await updateMenu(updateMenuDTO, [
                new BranchIdSpecification(branchId),
                new MenuIdSpecification(menuId)
            ]);
            
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
        @Params({validate: true}) { id: menuId }: MenuIdDTO,
        @CurrentUser() { branchId }: UserResponse
    ) {
        try {
            const affectedFields = await deleteMenu([
                new BranchIdSpecification(branchId),
                new MenuIdSpecification(menuId)
            ]);

            return {
                affectedFields
            }
        } catch (e) {
            handleHttp(res, MenuErrors.MENU_ERROR_CANNOT_DELETE_MENU, e);
        }
    }
}
