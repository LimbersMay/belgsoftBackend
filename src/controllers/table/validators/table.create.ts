import {IsNotEmpty, IsNumber, IsString} from "class-validator";
import {IsTableDoesNotExist} from "./table-existance";
import {TABLE_ERRORS} from "../../../errors/table.errors";

export class CreateTableDTO {
    @IsString({
        message: "Table number must be a string"
    })
    @IsNotEmpty({
        message: "Table number is required"
    })
    @IsTableDoesNotExist({
        message: TABLE_ERRORS.TABLE_ERROR_TABLE_ALREADY_EXISTS
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
