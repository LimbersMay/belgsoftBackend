import {IsBoolean, IsNumber, IsString} from "class-validator";

export class CreateMenuDTO {

    @IsString({
        message: 'Category id must be a string'
    })
    categoryId!: string;

    @IsString({
        message: 'Name must be a string'
    })
    name!: string;

    @IsString({
        message: 'Description must be a string'
    })
    description!: string;

    @IsNumber({}, {
        message: 'Price must be a number'
    })
    price!: number;

    @IsBoolean({
        message: 'Is available must be a boolean'
    })
    isAvailable!: boolean;

    @IsString({
        message: 'Image must be a string'
    })
    image!: string;
}