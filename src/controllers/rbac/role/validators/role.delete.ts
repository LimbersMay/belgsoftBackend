import {IsNotEmpty, IsString} from "class-validator";
import {DoesRoleWithQueryExists} from "./role-existance";
import {RoleIdSpecification} from "../../../../specifications";
import {RoleError} from "../../../../errors/role.error";

export class RoleIdDTO {
    @IsNotEmpty()
    @IsString()
    @DoesRoleWithQueryExists(
        (value: string) => new RoleIdSpecification(value),
        {
            message: RoleError.ROLE_NOT_FOUND
        }
    )
    roleId!: string;
}
