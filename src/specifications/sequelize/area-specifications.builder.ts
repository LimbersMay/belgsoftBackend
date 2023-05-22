import {AbstractSpecificationBuilder} from "./specifications.builder";
import {Specification} from "../generic-specification";
import {WhereOptions} from "sequelize";
import {Area} from "../../interfaces/area.interface";
import {BranchIdSpecification} from "../";
import {AreaIdSpecification} from "../area.specification";

export class AreaSpecificationsBuilder extends AbstractSpecificationBuilder {
    buildWhereClauseFromSpecification<T>(specification: Specification<T>): WhereOptions<Area> {
        // build the where clause for the specification

        if (specification instanceof BranchIdSpecification) {
            return { branchId: specification.branchId };
        }

        if (specification instanceof AreaIdSpecification) {
            return { areaId: specification.areaId};
        }

        // If you have complex specifications, you can use the following
        return this.buildComplexSpecification(specification);
    }
}
