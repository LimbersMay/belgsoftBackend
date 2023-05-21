import {IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, ValidateIf} from "class-validator";

export class CreateOrderDTO {
    @IsUUID(4, {
        message: 'menuId is not a valid uuid'
    })
    menuId!: string;

    @IsOptional()
    @ValidateIf(o => o.customerName !== undefined)
    @IsNotEmpty({
        message: 'customerName is required'
    })
    @IsString({
        message: 'customerName must be a string'
    })
    customerName?: string;

    @IsUUID(4, {
        message: 'areaId is not a valid uuid'
    })
    areaId!: string;

    @IsUUID(4, {
        message: 'tableId is not a valid uuid'
    })
    tableId!: string;

    @IsUUID(4, {
        message: 'userId is not a valid uuid'
    })
    userId!: string;

    @IsUUID(4, {
        message: 'orderStatusId is not a valid uuid'
    })
    orderStatusId!: string;

    @IsNotEmpty({
        message: 'price is required'
    })
    @IsNumber({}, {
        message: 'price must be a number'
    })
    price!: number;

    @IsNotEmpty({
        message: 'quantity is required'
    })
    quantity!: number;
}
