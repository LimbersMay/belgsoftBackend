import {Body, Get, JsonController, Param, Put, Res} from "routing-controllers";
import {handleHttp} from "../utils";
import {Response} from "express";
import {getAllUsers, getUserById, updateUser} from "../services";
import {USER_ERRORS} from "../errors";

@JsonController('/users')
export class UserController {

    @Get('/')
    async getAll(@Res() res: Response) {
        try {
            return await getAllUsers();
        } catch (e) {
            return handleHttp(res, USER_ERRORS.USER_ERROR_CANNOT_GET_USERS, e);
        }
    }

    @Get('/:id')
    async getOne(@Res() res: Response, @Param('id') id: string) {

        try {
            return await getUserById(id);
        } catch (e) {
            return handleHttp(res, USER_ERRORS.USER_ERROR_CANNOT_GET_USER, e);
        }
    }

    @Put('/:id')
    async updateUser(@Res() res: Response, @Param('id') id: string, @Body() body: any) {
        try {

            const updatedFields = {
                name: body.name,
                email: body.email,
                password: body.password
            }

            return await updateUser(id, updatedFields);
        } catch (e) {
            return handleHttp(res, USER_ERRORS.USER_ERROR_CANNOT_UPDATE_USER, e);
        }
    }
}
