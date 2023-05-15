import {IsNotEmpty, IsString} from "class-validator";

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

    @IsString({
        message: "Email must be a string"
    })
    @IsNotEmpty({
        message: "Email is required"
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
