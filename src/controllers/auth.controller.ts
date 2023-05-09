import {Body, BodyParam, JsonController, Post, Res} from "routing-controllers";
import {loginUser, registerUser} from "../services";
import {Auth} from "../interfaces";
import {Response} from "express";
import {handleHttp} from "../utils";
import {AUTH_ERRORS, USER_ERRORS} from "../errors";

@JsonController('/auth')
export class AuthController {

    @Post('/register')
    async register(@Res() res: Response, @Body() body: Auth) {
        try {
            return await registerUser(body);
        } catch (e) {
            return handleHttp(res, AUTH_ERRORS.AUTH_CANNOT_REGISTER_USER, e)
        }
    }

    @Post('/login')
    async login(@Res() res: Response, @BodyParam('email') email: string, @BodyParam('password') password: string) {
        try {
            const responseUser = await loginUser({email, password});

            // Error handling
            switch (responseUser) {
                case USER_ERRORS.USER_NOT_FOUND:
                    return handleHttp(res, USER_ERRORS.USER_NOT_FOUND);

                case AUTH_ERRORS.AUTH_INCORRECT_PASSWORD:
                    return handleHttp(res, AUTH_ERRORS.AUTH_INCORRECT_PASSWORD);
            }

            return responseUser;
        } catch (e) {
            return handleHttp(res, AUTH_ERRORS.AUTH_CANNOT_LOGIN_USER, e)
        }
    }
}
