import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import {AuthError} from "../../../errors";
import {DoesUserWithQueryNotExist} from "../../user/validators/user-existance";
import {UserEmailSpecification} from "../../../specifications";

export class AuthRegisterDTO {
    @IsString({
        message: "Name must be a string"
    })
    @IsNotEmpty({
        message: "Name is required"
    })
    name!: string;

    @IsEmail({}, {
        message: "Invalid email"
    })
    @IsNotEmpty({
        message: "Email is required"
    })
    @DoesUserWithQueryNotExist(
        (email: string) => new UserEmailSpecification(email),
        {
            message: AuthError.AUTH_ERROR_EMAIL_ALREADY_EXISTS,
        }
    )
    email!: string;

    @IsString({
        message: "Password must be a string"
    })
    @IsNotEmpty({
        message: "Password is required"
    })
    password!: string;
}
