import {IsNumber, IsString} from "class-validator";

export class CreateTableDTO {
    @IsString({
        message: "Table number must be a string"
    })
    number!: string;

    @IsNumber({}, {
        message: "Table customers must be a number"
    })
    customers!: number;
}
