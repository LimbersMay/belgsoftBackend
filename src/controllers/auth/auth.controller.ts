import {Response, Request} from "express";
import {Body, CurrentUser, Get, JsonController, Post, Req, Res} from "routing-controllers";
import {findUser, loginUser, registerUser} from "../../services";
import {handleHttp, verifyToken} from "../../utils";
import {AuthError, UserError} from "../../errors";
import {AuthRegisterDTO} from "./validators/auth.register";
import {AuthLoginDTO} from "./validators/auth.login";
import {UserResponse} from "../../mappers";
import {UserIdSpecification} from "../../specifications";
import {UserSchema} from "../../models";

@JsonController('/auth')
export class AuthController {

    @Post('/register')
    public async register(
        @Res() res: Response,
        @Body({validate: true}) authRegisterDTO: AuthRegisterDTO
    ) {
        try {
            return await registerUser(authRegisterDTO, undefined);
        } catch (e) {
            return handleHttp(res, AuthError.AUTH_ERROR_CANNOT_REGISTER_USER, e, 500)
        }
    }

    @Post('/login')
    public async login(
        @Res() res: Response,
        @Body({validate: true}) authLoginDTO: AuthLoginDTO
    ) {

        // Destructure email and password from body (authLoginDTO)
        const {email, password} = authLoginDTO;

        const responseUser = await loginUser({email, password});

        if (responseUser.isOk()) return responseUser.value;

        const errValue = responseUser.error;

        switch (errValue) {

            case AuthError.AUTH_ERROR_INCORRECT_PASSWORD:
                return handleHttp(res, errValue);

            case UserError.USER_NOT_FOUND:
                return handleHttp(res, errValue);

            default:
                const unhandledError: never = errValue;
                return handleHttp(res, AuthError.AUTH_ERROR_CANNOT_LOGIN_USER, unhandledError, 500);
        }
    }

    @Post('/isAuthenticated')
    public async isAuthenticated(
        @Res() res: Response,
        @Req() req: Request,
        @Body() body: {token: string},
        @CurrentUser() currentUser: UserResponse
   ) {

        // The currentUser decorator will return undefined if the user is not authenticated
        // And then the error will be handled in the handleHttp function

        const token = req.headers['x-token'] as string;

        try {
            const userToken = await verifyToken(token);
            const user = await findUser(new UserIdSpecification(userToken.userId));

            if (user.isErr()) {
                return handleHttp(res, UserError.USER_NOT_FOUND, user.error, 404);
            }

            return {
                user: UserResponse.fromUser(user.value)
            }

        } catch (e) {
            console.log(e)
            return handleHttp(res, AuthError.AUTH_ERROR_INVALID_SESSION, e, 401);
        }
    }
}
