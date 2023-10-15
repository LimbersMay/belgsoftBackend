import {IsNotEmpty, IsNumber, IsOptional, IsString, ValidateIf} from "class-validator";
import {DoesTableWithQueryExist} from "./table-existance";
import {TableErrors} from "../../../errors";
import {TableIdSpecification} from "../../../specifications";

export class TableIdDTO {
    @IsString({
        message: 'Id must be a string'
    })
    @IsNotEmpty({
        message: 'Id is required'
    })
    @DoesTableWithQueryExist(
        (value: string) => new TableIdSpecification(value),
        {
            message: TableErrors.TABLE_ERROR_TABLE_NOT_FOUND
        }
    )
    id!: string;
}

export class UpdateTableDTO {

    @IsOptional()
    @ValidateIf((_v, value) => value !== undefined)
    @IsString({
        message: 'Number must be a string'
    })
    number!: string;

    @IsOptional()
    @IsNumber({}, {
        message: 'Customers must be a number'
    })
    customers!: number;
}
