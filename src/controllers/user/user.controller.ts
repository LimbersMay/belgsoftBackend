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
        try {
            return await findAllUsers(new CreatedByAdminIdSpecification(user.userId));
        } catch (e) {
            return handleHttp(res, UserError.USER_ERROR_CANNOT_GET_USERS, e);
        }
    }

    @Authorized(['ADMIN', 'WAITER'])
    @Put('/:id')
    async updateUser(
        @Res() res: Response,
        @Params({validate: true}) {id: UserToUpdateId}: UpdateUserIdDTO,
        @Body({validate: true}) updateUserDTO: UpdateUserDTO,
        @CurrentUser() user: UserResponse
    ) {
        try {

            if (UserToUpdateId !== user.userId) {
                // If an admin is updating a user, the user must be updated by the admin who created it
                const result = await updateUser(updateUserDTO, [
                    new UserIdSpecification(UserToUpdateId),
                    new CreatedByAdminIdSpecification(user.userId)
                ]);

                if (result.isOk()) return result.value;

                switch (result.error) {
                    case UserError.USER_NOT_UPDATED:
                        return handleHttp(res, UserError.USER_NOT_UPDATED);

                    case UserError.USER_ERROR_CANNOT_UPDATE_USER:
                        return handleHttp(res, UserError.USER_ERROR_CANNOT_UPDATE_USER);

                    default:
                        const _exhaustiveCheck: never = result.error;
                        return handleHttp(res, UserError.USER_ERROR_CANNOT_UPDATE_USER, _exhaustiveCheck)
                }
            }

            // If the user wants to update his own data, he can do it without any restrictions
            const result = await updateUser(updateUserDTO, new UserIdSpecification(user.userId));
            if (result.isOk()) return result.value;

        } catch (e) {
            return handleHttp(res, UserError.USER_ERROR_CANNOT_UPDATE_USER, e);
        }
    }

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
