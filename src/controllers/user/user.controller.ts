import {Authorized, Body, Get, JsonController, Param, Params, Post, Put, Res, UseBefore} from "routing-controllers";
import {handleHttp} from "../../utils";
import {Response} from "express";
import {getAllUsers, getUserById, registerUser, updateUser} from "../../services";
import {USER_ERRORS} from "../../errors";
import {IsAuthenticated} from "../../middlewares";
import {CreateUserDTO} from "./validators/user.create";
import {UpdateUserDTO, UpdateUserIdDTO} from "./validators/user.update";

@JsonController('/users')
export class UserController {

    @UseBefore(IsAuthenticated)
    @Authorized('ADMIN')
    @Get('/')
    async getAll(@Res() res: Response) {
        try {
            return await getAllUsers();
        } catch (e) {
            return handleHttp(res, USER_ERRORS.USER_ERROR_CANNOT_GET_USERS, e);
        }
    }

    @UseBefore(IsAuthenticated)
    @Authorized('ADMIN')
    @Get('/:id')
    async getOne(
        @Res() res: Response,
        @Param('id') id: string
    ) {

        try {
            return await getUserById(id);
        } catch (e) {
            return handleHttp(res, USER_ERRORS.USER_ERROR_CANNOT_GET_USER, e);
        }
    }

    @UseBefore(IsAuthenticated)
    @Authorized('ADMIN')
    @Put('/:id')
    async updateUser(
        @Res() res: Response,
        @Params({validate: true}) {id}: UpdateUserIdDTO,
        @Body({validate: true}) updateUserDTO: UpdateUserDTO
    ) {
        try {
            return await updateUser(id, updateUserDTO);
        } catch (e) {
            return handleHttp(res, USER_ERRORS.USER_ERROR_CANNOT_UPDATE_USER, e);
        }
    }

    @UseBefore(IsAuthenticated)
    @Authorized('ADMIN')
    @Post('/')
    async createUser(
        @Res() res: Response,
        @Body({validate: true}) userCreateDTO: CreateUserDTO
    ) {
        try {
            const userResponse = await registerUser(userCreateDTO);

            if (typeof userResponse === 'string') {
                return handleHttp(res, userResponse);
            }

            return userResponse;
        } catch (e) {
            return handleHttp(res, USER_ERRORS.USER_ERROR_CANNOT_CREATE_USER, e);
        }

    }
}
