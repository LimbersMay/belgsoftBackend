import {Response} from "express";
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
import {handleHttp} from "../../utils";
import {
    deleteUser,
    findAllUsers,
    registerUser,
    updateUser
} from "../../services";
import {UserError} from "../../errors";
import {IsAuthenticated} from "../../middlewares";
import {UpdateUserDTO, UpdateUserIdDTO} from "./validators/user.update";
import {UserResponse} from "../../mappers";
import {AuthRegisterDTO} from "../auth/validators/auth.register";
import {UserIdSpecification} from "../../specifications";

@JsonController('/users')
@UseBefore(IsAuthenticated)
export class UserController {

    @Authorized('ADMIN')
    @Get('/')
    async getAll(@Res() res: Response, @CurrentUser() user: UserResponse) {

        const result = await findAllUsers();

        if (result.isOk()) return result.value;

        return handleHttp(res, UserError.USER_ERROR_CANNOT_GET_USERS, result.error, 500);
    }

    @Authorized('ADMIN')
    @Post('/')
    async create(
        @Res() res: Response,
        @Body({validate: true}) userCreateDTO: AuthRegisterDTO,
        @CurrentUser() user: UserResponse
    ) {
        try {
            return await registerUser(userCreateDTO, user.userId);
        } catch (e) {
            return handleHttp(res, UserError.USER_ERROR_CANNOT_CREATE_USER, e, 500);
        }
    }

    @Authorized(['ADMIN', 'WAITER'])
    @Put('/:id')
    async update(
        @Res() res: Response,
        @Params({validate: true}) {id: UserToUpdateId}: UpdateUserIdDTO,
        @Body({validate: true}) updateUserDTO: UpdateUserDTO,
        @CurrentUser() user: UserResponse
    ) {

        if (UserToUpdateId !== user.userId) {
            // If an admin is updating a user, the user must be updated by the admin who created it
            const affectedUser = await updateUser(updateUserDTO, [
                new UserIdSpecification(UserToUpdateId)
            ]);

            if (affectedUser.isOk()) return affectedUser.value;

            switch (affectedUser.error) {
                case UserError.USER_NOT_UPDATED:
                    return handleHttp(res, UserError.USER_NOT_UPDATED, affectedUser.error, 400);

                default:
                    const _exhaustiveCheck: never = affectedUser.error;
                    return handleHttp(res, UserError.USER_ERROR_CANNOT_UPDATE_USER, _exhaustiveCheck, 500)
            }
        }

        // If the user wants to update his own data, he can do it without any restrictions
        const affectedFieldsResult = await updateUser(updateUserDTO, new UserIdSpecification(user.userId));
        if (affectedFieldsResult.isOk()) return {
            affectedFields: affectedFieldsResult.value
        };
    }

    @Authorized('ADMIN')
    @Delete('/:id')
    async delete(
        @Res() res: Response,
        @Params({validate: true}) {id: userId}: UpdateUserIdDTO,
        @CurrentUser() user: UserResponse
    ) {
        try {

            return await deleteUser([
                new UserIdSpecification(userId)
            ]);

        } catch (e) {
            return handleHttp(res, UserError.USER_ERROR_CANNOT_DELETE_USER, e, 500);
        }
    }
}
