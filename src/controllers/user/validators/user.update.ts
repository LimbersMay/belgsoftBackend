import {IsEmail, IsNotEmpty, IsOptional, IsString, ValidateIf} from "class-validator";
import {DoesUserWithQueryNotExist, DoesUserWithQueryExist} from "./user-existance";
import {UserEmailSpecification, UserIdSpecification} from "../../../specifications";
import {AuthError, UserError} from "../../../errors";

export class UpdateUserIdDTO {
        @IsString({
            message: 'Id must be a string'
        })
        @IsNotEmpty({
            message: 'Id is required'
        })
        @DoesUserWithQueryExist(
            (id: string) => new UserIdSpecification(id),
            {
                message: UserError.USER_NOT_FOUND
            }
        )
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
    @DoesUserWithQueryNotExist(
        (email: string) => new UserEmailSpecification(email),
        {
            message: AuthError.AUTH_ERROR_EMAIL_ALREADY_EXISTS
        }
    )
    email?: string;

    @IsOptional()
    @IsString({
        message: 'Name must be a string'
    })
    @IsNotEmpty({
        message: 'Name is required'
    })
    password?: string;

    @IsOptional()
    @IsString({
        message: 'UserStateId must be a string'
    })
    userStateId?: string;
}
