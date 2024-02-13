import {IsNotEmpty, IsOptional, IsString, IsUUID, ValidateIf} from "class-validator";
import {IsAreaExists} from "./area-existance";
import {AreaIdSpecification} from "../../../specifications";
import {AreaError} from "../../../errors/area.error";

export class UpdateIdDTO {
    @IsUUID('4', {
        message: 'id must be a UUID'
    })
    @IsAreaExists((userId) => new AreaIdSpecification(userId), {
        message: AreaError.AREA_NOT_FOUND
    })
    id!: string;
}

export class UpdateAreaDTO {

    @IsOptional()
    @ValidateIf((_v, value) => value !== undefined)
    @IsString({
        message: 'name must be a string'
    })
    name!: string;

    @IsOptional()
    @IsString({
        message: 'description must be a string'
    })
    description!: string;
}
