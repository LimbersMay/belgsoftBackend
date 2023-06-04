import {IsNotEmpty, IsNumber, IsUUID} from "class-validator";

export class MenuItemDTO {

    @IsUUID(4, {
        message: 'menuId is not a valid uuid',
    })
    @IsNotEmpty({
        message: 'menuId is required'
    })
    menuId!: string;

    @IsNotEmpty({
        message: 'quantity is required'
    })
    quantity!: number;

    @IsNotEmpty({
        message: 'price is required'
    })
    price!: number;
}
