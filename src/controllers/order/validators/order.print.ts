import {IsNotEmpty, IsString} from "class-validator";
import {Type} from "class-transformer";
import {ProductItemDTO} from "./product";

export class PrintOrderDTO {

    @IsNotEmpty({
        message: "productsInOrder is required"
    })
    @Type(() => ProductItemDTO)
    productsInOrder!: ProductItemDTO[][];

    @IsNotEmpty({
        message: "areaTitle is required"
    })
    @IsString({
        message: "areaTitle must be a string"
    })
    areaTitle!: string;

    @IsNotEmpty({
        message: "areaTitle is required"
    })
    @IsString({
        message: "areaTitle must be a string"
    })
    tableTitle!: string;
}
