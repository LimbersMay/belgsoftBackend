import {IsNotEmpty, IsNumber, IsString} from "class-validator";
import {DoesTableWithQueryDoesNotExist} from "./table-existance";
import {TableErrors} from "../../../errors";
import {TableNumberSpecification} from "../../../specifications";

export class CreateTableDTO {
    @IsString({
        message: "Table number must be a string"
    })
    @IsNotEmpty({
        message: "Table number is required"
    })
    @DoesTableWithQueryDoesNotExist(
        (value: string) => new TableNumberSpecification(value),
        {
            message: TableErrors.TABLE_ERROR_TABLE_ALREADY_EXISTS
        }
    )
    number!: string;

    @IsNumber({}, {
        message: "Table customers must be a number"
    })
    @IsNotEmpty({
        message: "Table customers is required"
    })
    customers!: number;
}
