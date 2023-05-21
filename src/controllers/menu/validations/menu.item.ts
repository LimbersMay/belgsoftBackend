import {IsNotEmpty, IsNumber, IsUUID} from "class-validator";

export class MenuItemDTO {

    @IsUUID(4, {
        message: 'menuId is not a valid uuid',
    })
    @IsNotEmpty({
        message: 'menuId is required'
    })
    menuId!: string;

    @IsNumber({}, {
        message: 'quantity must be a number'
    })
    @IsNotEmpty({
        message: 'quantity is required'
    })
    quantity!: number;
}
