import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class CreateTableDTO {
    @IsString({
        message: "Table number must be a string"
    })
    @IsNotEmpty({
        message: "Table number is required"
    })
    number!: string;

    @IsNumber({}, {
        message: "Table customers must be a number"
    })
    @IsNotEmpty({
        message: "Table customers is required"
    })
    customers!: number;
}
