import {AbstractSpecification, Expression} from "./generic-specification";
import {Role} from "../interfaces/role.interface";

export class RoleIdSpecification extends AbstractSpecification<Role> {

    public readonly roleId: string;

    constructor(roleId: string) {
        super();
        this.roleId = roleId;
    }

    isSatisfiedBy(candidate: Role): boolean {
        return candidate.roleId === this.roleId;
    }

    convertToExpression(): Expression<Role> {
        return { roleId: this.roleId };
    }
}