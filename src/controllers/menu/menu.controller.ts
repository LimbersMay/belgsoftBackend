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
import {MenuError} from "../../errors";
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
        @CurrentUser() {branchId}: UserResponse
    ) {
        const menusResult = await findAllMenu(new BranchIdSpecification(branchId));

        if (menusResult.isOk()) return menusResult.value;

        return handleHttp(res, MenuError.MENUS_CANNOT_BE_FOUND_ERROR, menusResult.error, 500);
    }

    @Get('/foods')
    @Authorized(['ADMIN', 'WAITER'])
    public async getAllFoods(
        @Res() res: Response,
        @CurrentUser() {branchId}: UserResponse,
    ) {

        const findAllResult = await findAllMenu([
            new BranchIdSpecification(branchId),
            new CategoryIdSpecification('da47c63f-196a-4240-bf58-846fd7f0931d')
        ]);

        if (findAllResult.isOk()) return findAllResult.value;

        return handleHttp(res, MenuError.MENUS_CANNOT_BE_FOUND_ERROR, findAllResult.error, 500);
    }

    @Get('/drinks')
    @Authorized(['ADMIN', 'WAITER'])
    public async getAllDrinks(
        @Res() res: Response,
        @CurrentUser() {branchId}: UserResponse,
    ) {

        const drinksResult = await findAllMenu([
            new BranchIdSpecification(branchId),
            new CategoryIdSpecification('c1b6913e-78a1-407a-9e4b-49bb007b81c0')
        ]);

        if (drinksResult.isOk()) return drinksResult.value;

        return handleHttp(res, MenuError.MENUS_CANNOT_BE_FOUND_ERROR, drinksResult.error, 500);
    }

    @Get('/desserts')
    @Authorized(['ADMIN', 'WAITER'])
    public async getAllDesserts(
        @Res() res: Response,
        @CurrentUser() {branchId}: UserResponse,
    ) {

        const desertsResult = await findAllMenu([
            new BranchIdSpecification(branchId),
            new CategoryIdSpecification('5ff6a9c3-bfb4-4269-b8d6-22f620414199')
        ]);

        if (desertsResult.isOk()) return desertsResult.value;

        return handleHttp(res, MenuError.MENUS_CANNOT_BE_FOUND_ERROR, desertsResult.error, 500);
    }

    @Get('/:id')
    @Authorized(['ADMIN', 'WAITER'])
    public async getById(
        @Res() res: Response,
        @Params({validate: true}) {id: menuId}: MenuIdDTO,
        @CurrentUser() {branchId}: UserResponse
    ) {

        const findMenuResult = await findOneMenu([
            new BranchIdSpecification(branchId),
            new MenuIdSpecification(menuId)
        ]);

        if (findMenuResult.isOk()) return findMenuResult.value;

        switch (findMenuResult.error) {

            case MenuError.MENU_NOT_FOUND:
                return handleHttp(res, findMenuResult.error, findMenuResult.error);

            default:
                const _exhaustiveCheck: never = findMenuResult.error;
                return handleHttp(res, findMenuResult.error, _exhaustiveCheck, 500);
        }
    }

    @Post('/')
    @Authorized('ADMIN')
    public async create(
        @Res() res: Response,
        @Body({validate: true}) createMenuDTO: CreateMenuDTO,
        @CurrentUser() {branchId}: UserResponse
    ) {

        const result = await createMenu(createMenuDTO, branchId);

        if (result.isOk()) return result.value;

        return handleHttp(res, MenuError.MENU_ERROR_CANNOT_CREATE_MENU, result.error, 500);
    }

    @Put('/:id')
    @Authorized('ADMIN')
    public async update(
        @Res() res: Response,
        @Params({validate: true}) {id: menuId}: MenuIdDTO,
        @Body({validate: true}) updateMenuDTO: UpdateMenuDTO,
        @CurrentUser() {branchId}: UserResponse
    ) {

        const updateResult = await updateMenu(updateMenuDTO, [
            new BranchIdSpecification(branchId),
            new MenuIdSpecification(menuId)
        ]);

        if (updateResult.isOk()) return updateResult.value;

        switch (updateResult.error) {

            case MenuError.MENU_NOT_UPDATED:
                return handleHttp(res, updateResult.error, updateResult.error);

            case MenuError.MENU_NOT_FOUND:
                return handleHttp(res, updateResult.error, updateResult.error);

            default:
                const _exhaustiveCheck: never = updateResult.error;
                return handleHttp(res, MenuError.MENU_ERROR_CANNOT_UPDATE_MENU, _exhaustiveCheck, 500);
        }
    }

    @Delete('/:id')
    @Authorized('ADMIN')
    public async delete(
        @Res() res: Response,
        @Params({validate: true}) {id: menuId}: MenuIdDTO,
        @CurrentUser() {branchId}: UserResponse
    ) {

        const deleteResult = await deleteMenu([
            new BranchIdSpecification(branchId),
            new MenuIdSpecification(menuId)
        ]);

        if (deleteResult.isOk()) return {
            affectedFields: deleteResult
        }

        switch (deleteResult.error) {

            case MenuError.MENU_NOT_DELETED:
                return handleHttp(res, deleteResult.error, deleteResult.error);

            default:
                const _exhaustiveCheck: never = deleteResult.error;
                return handleHttp(res, MenuError.MENU_ERROR_CANNOT_DELETE_MENU, _exhaustiveCheck, 500);
        }

    }
}
