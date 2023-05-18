import {IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, ValidateIf} from "class-validator";

export class MenuIdDTO {
    @IsString({
        message: "Id must be a string"
    })
    @IsNotEmpty({
        message: "Id cannot be empty"
    })
    @IsUUID(4, {
        message: "Id must be an uuid"
    })
    id!: string;
}

export class UpdateMenuDTO {

    @IsOptional()
    @ValidateIf((_v, value) => value !== undefined)
    @IsString({
        message: "Name must be a string"
    })
    name!: string;

    @IsOptional()
    @IsNumber({},{
        message: "Price must be a number"
    })
    price!: number;

    @IsOptional()
    @IsBoolean({
        message: "Is available must be a boolean"
    })
    isAvailable!: boolean;

    @IsOptional()
    @IsString({
        message: "Description must be a string"
    })
    description!: string;

    @IsOptional()
    @IsString({
        message: "Image must be a string"
    })
    image!: string;
}
