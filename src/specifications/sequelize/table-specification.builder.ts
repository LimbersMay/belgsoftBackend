import {AbstractSpecificationBuilder} from "./specifications.builder";
import {WhereOptions} from "sequelize";
import {Specification} from "../generic-specification";
import {TableIdSpecification} from "../table.specification";
import {Table} from "../../interfaces";

export class TableSpecificationBuilder extends AbstractSpecificationBuilder {
    buildWhereClauseFromSpecification<T>(specification: Specification<T>): WhereOptions<Table> {

        if (specification instanceof TableIdSpecification) {
            return {tableId: specification.tableId}
        }

        return this.buildComplexSpecification(specification);
    }
}
