import {Response} from "express";
import {
    Authorized,
    Body,
    CurrentUser,
    Delete,
    Get,
    JsonController,
    Params,
    Post,
    Put,
    Res,
    UseBefore
} from "routing-controllers";
import {IsAuthenticated} from "../../middlewares";
import {createMenu, findAllMenu} from "../../services/menu.service";
import {handleHttp} from "../../utils";
import {MenuError} from "../../errors/menu.error";
import {CreateMenuDTO} from "./validations/menu.create";
import {UpdateMenuDTO, UpdateMenuIdDTO} from "./validations/menu.update";
import {UserResponse} from "../../mappers";

@JsonController('/menu')
@UseBefore(IsAuthenticated)
export class MenuController {

    @Get('/')
    public async getAll(@Res() res: Response) {
        try {
            return await findAllMenu();
        } catch (e) {
            handleHttp(res, MenuError.MENU_ERROR_CANNOT_GET_MENUS, e);
        }
    }

    @Post('/')
    @Authorized('ADMIN')
    public async create(@Res() res: Response, @Body({validate: true}) createMenuDTO: CreateMenuDTO, @CurrentUser() user: UserResponse) {
        try {
            return await createMenu(createMenuDTO, user.branchId);
        } catch (e) {
            handleHttp(res, MenuError.MENU_ERROR_CANNOT_CREATE_MENU, e);
        }
    }

    @Put('/:id')
    public async update(@Res() res: Response, @Params({validate: true}) { id }: UpdateMenuIdDTO  , @Body({validate: true}) updateMenuDTOe: UpdateMenuDTO) {
        try {
            return "Not implemented";
        } catch (e) {
            handleHttp(res, MenuError.MENU_ERROR_CANNOT_UPDATE_MENU, e);
        }
    }

    @Delete('/:id')
    public async delete(@Res() res: Response, @Params({validate: true}) { id }: UpdateMenuIdDTO) {
        try {
            return "Not implemented";
        } catch (e) {
            handleHttp(res, MenuError.MENU_ERROR_CANNOT_DELETE_MENU, e);
        }
    }
}
