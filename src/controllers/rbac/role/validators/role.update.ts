import {IsOptional, IsString, ValidateIf} from "class-validator";

export class UpdateRoleDTO {
    @IsOptional()
    @ValidateIf((_v, value) => value !== undefined)
    @IsString({
        message: 'name must be a string'
    })
    name!: string;

    @IsOptional()
    @IsString({
        message: 'value must be a string'
    })
    value!: string;
}
