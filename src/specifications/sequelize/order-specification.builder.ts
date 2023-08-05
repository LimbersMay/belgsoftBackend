import {AbstractSpecificationBuilder} from "./specifications.builder";
import {Specification} from "../generic-specification";
import {WhereOptions} from "sequelize";
import {OrderIdSpecification} from "../order.specification";
import {Order} from "../../interfaces";
import {TableIdSpecification} from "../table.specification";

export class OrderSpecificationBuilder extends AbstractSpecificationBuilder {
    buildWhereClauseFromSpecification<T>(specification: Specification<T>): WhereOptions<Order> {

        if (specification instanceof OrderIdSpecification) {
            return {orderId: specification.orderId};
        } if (specification instanceof TableIdSpecification) {
            return {tableId: specification.tableId}
        }

        return this.buildComplexSpecification(specification);
    }
}
