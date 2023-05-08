import {Body, Get, JsonController, Param, Post, Put, Res} from "routing-controllers";
import {handleHttp} from "../utils/error.handler";
import {Response} from "express";
import {User} from "../interfaces/user.interface";
import {createUser, getAllUsers, getUserById, updateUser} from "../services/user.service";

@JsonController('/users')
export class UserController {

    @Get('/')
    async getAll(@Res() res: Response) {
        try {
            return await getAllUsers();
        } catch (e) {
            handleHttp(res, 'ERROR_GET_USERS');
        }
    }

    @Get('/:id')
    async getOne(@Res() res: Response, @Param('id') id: number) {

        try {
            return await getUserById(id);
        } catch (e) {
            handleHttp(res, 'ERROR_GET_USER');
        }
    }

    @Post('/')
    async post(@Res() res: Response, @Body() user: User) {
        try {
            return await createUser(user);
        } catch (e) {
            handleHttp(res, 'ERROR_PUT_USER', e);
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
            handleHttp(res, 'ERROR_PUT_USER');
        }
    }
}
