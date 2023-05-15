import {IsNotEmpty, IsString} from "class-validator";

export class TableUpdateDTO {
    @IsString({
        message: 'Number must be a string'
    })
    @IsNotEmpty({
        message: 'Number is required'
    })
    number!: string;

    @IsString({
        message: 'Customers must be a string'
    })
    @IsNotEmpty({
        message: 'Customers is required'
    })
    customers!: string;
}
