import {Response} from "express";
import {
    Authorized,
    Body,
    CurrentUser,
    Get,
    JsonController,
    Param,
    Params,
    Post,
    Put,
    Res,
    UseBefore
} from "routing-controllers";
import {handleHttp} from "../../utils";
import {findUserByAdminId, getAllUsersByAdminId, getUserById, registerUser, updateUser} from "../../services";
import {UserError} from "../../errors";
import {IsAuthenticated} from "../../middlewares";
import {UpdateUserDTO, UpdateUserIdDTO} from "./validators/user.update";
import {UserResponse} from "../../mappers";
import {AuthRegisterDTO} from "../auth/validators/auth.register";

@JsonController('/users')
export class UserController {

    @UseBefore(IsAuthenticated)
    @Authorized('ADMIN')
    @Get('/')
    async getAll(@Res() res: Response, @CurrentUser() user: UserResponse) {
        try {
            return await getAllUsersByAdminId(user.userId);
        } catch (e) {
            return handleHttp(res, UserError.USER_ERROR_CANNOT_GET_USERS, e);
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
            return handleHttp(res, UserError.USER_ERROR_CANNOT_GET_USER, e);
        }
    }

    @UseBefore(IsAuthenticated)
    @Authorized('ADMIN')
    @Put('/:id')
    async updateUser(
        @Res() res: Response,
        @Params({validate: true}) {id}: UpdateUserIdDTO,
        @Body({validate: true}) updateUserDTO: UpdateUserDTO,
        @CurrentUser() user: UserResponse
    ) {
        try {

            if (user.userId !== id) {
                const userToUpdate = await findUserByAdminId(id, user.userId);
                if (!userToUpdate) return handleHttp(res, UserError.USER_NOT_FOUND, 'User not found');
            }

            return await updateUser(id, user.createdByUserId, updateUserDTO)
        } catch (e) {
            return handleHttp(res, UserError.USER_ERROR_CANNOT_UPDATE_USER, e);
        }
    }

    @UseBefore(IsAuthenticated)
    @Authorized('ADMIN')
    @Post('/')
    async createUser(
        @Res() res: Response,
        @Body({validate: true}) userCreateDTO: AuthRegisterDTO,
        @CurrentUser() user: UserResponse
    ) {
        try {
            return await registerUser(userCreateDTO, user.userId);
        } catch (e) {
            return handleHttp(res, UserError.USER_ERROR_CANNOT_CREATE_USER, e);
        }

    }
}
