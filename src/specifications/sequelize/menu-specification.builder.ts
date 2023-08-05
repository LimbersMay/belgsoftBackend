import {AbstractSpecificationBuilder} from "./specifications.builder";
import {MenuIdSpecification} from "../menu.specification";
import {Specification} from "../generic-specification";
import {WhereOptions} from "sequelize";
import {Menu} from "../../interfaces/menu.interface";
import {BranchIdSpecification} from "../branch.specification";
import {CategoryIdSpecification} from "../category.specification";

export class MenuSpecificationBuilder extends AbstractSpecificationBuilder {
    buildWhereClauseFromSpecification<T>(specification: Specification<T>): WhereOptions<Menu> {

        if (specification instanceof MenuIdSpecification) {
            return {menuId: specification.menuId};
        } else if (specification instanceof BranchIdSpecification) {
            return {branchId: specification.branchId};
        } else if (specification instanceof CategoryIdSpecification) {
            return {categoryId: specification.categoryId};
        }

        return this.buildComplexSpecification(specification);
    }
}
