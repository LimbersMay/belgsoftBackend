import {IsNotEmpty, IsNumber, IsOptional, IsString, ValidateIf} from "class-validator";
import {IsTableExist} from "./table-existance";
import {TableErrors} from "../../../errors";

export class TableIdDTO {
    @IsString({
        message: 'Id must be a string'
    })
    @IsNotEmpty({
        message: 'Id is required'
    })
    @IsTableExist({
        message: TableErrors.TABLE_ERROR_TABLE_NOT_FOUND
    })
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
