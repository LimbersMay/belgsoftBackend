import {Role} from "../interfaces/role.interface";
import {RoleSchema} from "../models";

export class RoleResponse {
    private roleId: string;
    private name: string;
    private value: string;
    private createdAt: Date;
    private updatedAt: Date;

    constructor({ roleId, name, value, createdAt, updatedAt }: { roleId: string, name: string, value: string, createdAt: Date, updatedAt: Date }) {
        this.roleId = roleId;
        this.name = name;
        this.value = value;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static fromRole(roleModel: RoleSchema) {
        return new RoleResponse({
            roleId: roleModel.roleId,
            name: roleModel.name,
            value: roleModel.value,
            createdAt: roleModel.createdAt,
            updatedAt: roleModel.updatedAt
        });
    }
}
