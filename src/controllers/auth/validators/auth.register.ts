import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import {IsUserAlreadyExist} from "../../validators/email-exists";
import {AuthError} from "../../../errors";

export class AuthRegisterDTO {
    @IsString({
        message: "Name must be a string"
    })
    @IsNotEmpty({
        message: "Name is required"
    })
    name!: string;

    @IsString({
        message: "BranchId must be a string"
    })
    @IsNotEmpty({
        message: "BranchId is required"
    })
    branchId!: string;

    @IsEmail({}, {
        message: "Invalid email"
    })
    @IsNotEmpty({
        message: "Email is required"
    })
    @IsUserAlreadyExist({
        message: AuthError.AUTH_ERROR_EMAIL_ALREADY_EXISTS
    })
    email!: string;

    @IsString({
        message: "Password must be a string"
    })
    @IsNotEmpty({
        message: "Password is required"
    })
    password!: string;

    @IsString({
        message: "RoleId must be a string"
    })
    @IsNotEmpty({
        message: "RoleId is required"
    })
    roleId!: string;

    @IsString({
        message: "UserTypeId must be a string"
    })
    @IsNotEmpty({
        message: "UserTypeId is required"
    })
    userTypeId!: string;

    @IsString({
        message: "UserStateId must be a string"
    })
    @IsNotEmpty({
        message: "UserStateId is required"
    })
    userStateId!: string;
}
