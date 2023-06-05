import {IsNotEmpty, IsString} from "class-validator";

export class ProductItemDTO {
    @IsNotEmpty({
        message: "ProductName is required"
    })
    @IsString({
        message: "ProductName must be a string"
    })
    productName!: string;

    @IsNotEmpty({
        message: "quantity is required"
    })
    @IsString({
        message: "quantity must be a string"
    })
    quantity!: string;
}
