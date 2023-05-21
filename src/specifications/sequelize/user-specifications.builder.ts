import {AbstractSpecificationBuilder} from "./specifications.builder";
import {Specification} from "../generic-specification";
import {WhereOptions} from "sequelize";
import {User} from "../../interfaces";
import {CreatedByAdminIdSpecification, UserEmailSpecification, UserIdSpecification} from "../user.specification";

export class UserSpecificationBuilder extends AbstractSpecificationBuilder {
    buildWhereClauseFromSpecification<T>(specification: Specification<T>): WhereOptions<User> {
        if (specification instanceof UserIdSpecification) {
            return {userId: specification.userId};
        } else if (specification instanceof UserEmailSpecification) {
            return {email: specification.email};
        } else if (specification instanceof CreatedByAdminIdSpecification) {
            return {createdByUserId: specification.adminId};
        }

        return this.buildComplexSpecification(specification);
    }
}