import {Body, JsonController, Post} from "routing-controllers";
import {registerUser} from "../services";
import {Auth} from "../interfaces/auth.interface";
import {UserResponse} from "../mappers/user.response";

@JsonController('/auth')
export class AuthController {

    @Post('/register')
    async register(@Body() body: Auth) {
        const registeredUser = await registerUser(body);
        return UserResponse.fromUser(registeredUser);
    }

    @Post('/login')
    async login() {
        return 'login';
    }
}
