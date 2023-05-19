import {Response} from "express";
import {Body, JsonController, Post, Res} from "routing-controllers";
import {loginUser, registerUser} from "../../services";
import {handleHttp} from "../../utils";
import {AUTH_ERRORS} from "../../errors";
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
            const responseUser = await registerUser(authRegisterDTO);

            // Error handling - if registeredUser is a string, then it's an error
            if (typeof responseUser === "string") return handleHttp(res, responseUser);

            return responseUser;
        } catch (e) {
            return handleHttp(res, AUTH_ERRORS.AUTH_ERROR_CANNOT_REGISTER_USER, e)
        }
    }

    @Post('/login')
    public async login(
        @Res() res: Response,
        @Body({validate: true}) authLoginDTO: AuthLoginDTO
    ) {
        try {
            // Destructure email and password from body (authLoginDTO)
            const {email, password} = authLoginDTO;

            const responseUser = await loginUser({email, password});

            // Error handling - if responseUser is a string, then it's an error
            if (typeof responseUser === "string") return handleHttp(res, responseUser)

            return responseUser;
        } catch (e) {
            return handleHttp(res, AUTH_ERRORS.AUTH_ERROR_CANNOT_LOGIN_USER, e)
        }
    }
}
