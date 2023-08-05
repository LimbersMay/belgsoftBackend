import {IsEmail, IsNotEmpty, IsOptional, IsString, ValidateIf} from "class-validator";
import {IsUserExist} from "./user-exists";
import {IsUserAlreadyExist} from "../../validators/email-exists";

export class UpdateUserIdDTO {
        @IsString({
            message: 'Id must be a string'
        })
        @IsNotEmpty({
            message: 'Id is required'
        })
        @IsUserExist({
            message: 'User not found'
        })
        id!: string;
}

export class UpdateUserDTO {

    @IsOptional()
    @ValidateIf((_, value) => value !== undefined)
    @IsString({
        message: 'Name must be a string'
    })
    name?: string;

    @IsOptional()
    @IsEmail({},{
        message: 'Name must be a string'
    })
    @IsUserAlreadyExist({
        message: 'Email already registered'
    })
    email?: string;

    @IsOptional()
    @IsString({
        message: 'Name must be a string'
    })
    @IsNotEmpty({
        message: 'Name is required'
    })
    password?: string;
}
