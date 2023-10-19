import {IsNotEmpty, IsString, IsUUID} from "class-validator";
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

    @IsString({
        message: 'name must be a string'
    })
    @IsNotEmpty({
        message: 'name is required'
    })
    name!: string;

    @IsString({
        message: 'description must be a string'
    })
    @IsNotEmpty({
        message: 'description is required'
    })
    description!: string;
}
