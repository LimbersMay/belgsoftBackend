import {
    IsArray,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    IsUUID,
    MinLength,
    ValidateIf,
    ValidateNested
} from "class-validator";
import {MenuItemDTO} from "../../menu/validations/menu.item";
import {Type} from "class-transformer";

export class CreateOrderDTO {

    @ValidateNested({
        each: true
    })
    @IsNotEmpty({
        message: 'menuItems is required'
    })
    @IsArray({
        message: 'menuItems must be an array'
    })
    @MinLength(1, {
        message: 'menuItems must contain at least one item'
    })
    @Type(() => MenuItemDTO)
    menuItems!: MenuItemDTO[];

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
