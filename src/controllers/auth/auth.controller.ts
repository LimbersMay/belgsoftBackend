import {Response} from "express";
import {Body, JsonController, Post, Res} from "routing-controllers";
import {loginUser, registerUser} from "../../services";
import {handleHttp} from "../../utils";
import {AuthError, UserError} from "../../errors";
import {AuthRegisterDTO} from "./validators/auth.register";
import {AuthLoginDTO} from "./validators/auth.login";

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
            return handleHttp(res, AuthError.AUTH_ERROR_CANNOT_REGISTER_USER, e)
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
                return handleHttp(res, AuthError.AUTH_ERROR_CANNOT_LOGIN_USER, unhandledError);
        }

    }
}
