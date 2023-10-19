import {Response} from "express";
import {
    Authorized,
    Body,
    CurrentUser,
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
    findAllUsers,
    registerUser,
    updateUser
} from "../../services";
import {UserError} from "../../errors";
import {IsAuthenticated} from "../../middlewares";
import {UpdateUserDTO, UpdateUserIdDTO} from "./validators/user.update";
import {UserResponse} from "../../mappers";
import {AuthRegisterDTO} from "../auth/validators/auth.register";
import {CreatedByAdminIdSpecification, UserIdSpecification} from "../../specifications";

@JsonController('/users')
@UseBefore(IsAuthenticated)
export class UserController {

    @Authorized('ADMIN')
    @Get('/')
    async getAll(@Res() res: Response, @CurrentUser() user: UserResponse) {

        const result = await findAllUsers(new CreatedByAdminIdSpecification(user.userId));

        if (result.isOk()) return result.value;

        return handleHttp(res, UserError.USER_ERROR_CANNOT_GET_USERS, result.error);
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
            const affectedFieldsResult = await updateUser(updateUserDTO, [
                new UserIdSpecification(UserToUpdateId),
                new CreatedByAdminIdSpecification(user.userId)
            ]);

            if (affectedFieldsResult.isOk()) return {
                affectedFields: affectedFieldsResult.value
            };

            switch (affectedFieldsResult.error) {
                case UserError.USER_NOT_UPDATED:
                    return handleHttp(res, UserError.USER_NOT_UPDATED);

                default:
                    const _exhaustiveCheck: never = affectedFieldsResult.error;
                    return handleHttp(res, UserError.USER_ERROR_CANNOT_UPDATE_USER, _exhaustiveCheck)
            }
        }

        // If the user wants to update his own data, he can do it without any restrictions
        const affectedFieldsResult = await updateUser(updateUserDTO, new UserIdSpecification(user.userId));
        if (affectedFieldsResult.isOk()) return {
            affectedFields: affectedFieldsResult.value
        };
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
            return handleHttp(res, UserError.USER_ERROR_CANNOT_CREATE_USER, e);
        }

    }
}
