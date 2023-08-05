import {IsNotEmpty, IsOptional, IsString, IsUUID, ValidateIf} from "class-validator";

export class OrderIdDTO {
    @IsString({
        message: "Id must be a string"
    })
    @IsNotEmpty({
        message: "Id cannot be empty"
    })
    @IsUUID(4, {
        message: "Id must be an uuid"
    })
    id!: string;
}

export class UpdateOrderDTO {

    @ValidateIf((_v, _value) => _value !== undefined)
    @IsOptional()
    @IsUUID(4, {
        message: 'orderId is not a valid uuid'
    })
    areaId!: string;

    @IsOptional()
    @IsUUID(4, {
        message: 'tableId is not a valid uuid'
    })
    tableId!: string;

    @IsOptional()
    @IsString({
        message: 'customerName is not a valid string'
    })
    customerName!: string;

    @IsOptional()
    @IsUUID(4, {
        message: 'orderStatus is not a valid uuid'
    })
    orderStatusId!: string;
}
