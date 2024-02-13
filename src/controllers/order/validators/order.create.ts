import {
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUUID,
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
    @Type(() => MenuItemDTO)
    menuItems!: MenuItemDTO[];

    @IsOptional()
    @ValidateIf(o => o.customerName !== undefined)
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
}
