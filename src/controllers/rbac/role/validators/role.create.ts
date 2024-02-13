import {IsNotEmpty, IsString} from "class-validator";

export class CreateRoleDTO {

    @IsNotEmpty({
        message: 'name is required'
    })
    @IsString({
        message: 'name must be a string'
    })
    name!: string;

    @IsNotEmpty({
        message: 'value is required'
    })

    @IsString({
        message: 'value must be a string'
    })
    value!: string;
}
