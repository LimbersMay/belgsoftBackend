import {IsNotEmpty, IsOptional, IsString, ValidateIf} from "class-validator";

export class UpdateMenuIdDTO {
    @IsString({
        message: "Id must be a string"
    })
    @IsNotEmpty({
        message: "Id cannot be empty"
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
    @IsString({
        message: "Price must be a string"
    })
    price!: number;

    @IsOptional()
    @IsString({
        message: "Is available must be a string"
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
