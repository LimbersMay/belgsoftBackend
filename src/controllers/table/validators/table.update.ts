import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class UpdateTableDTO {
    @IsString({
        message: 'Number must be a string'
    })
    @IsNotEmpty({
        message: 'Number is required'
    })
    number!: string;

    @IsNumber({}, {
        message: 'Customers must be a number'
    })
    @IsNotEmpty({
        message: 'Customers is required'
    })
    customers!: number;
}
