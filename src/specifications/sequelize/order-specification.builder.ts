import {AbstractSpecificationBuilder} from "./specifications.builder";
import {Specification} from "../generic-specification";
import {WhereOptions} from "sequelize";
import {OrderIdSpecification} from "../order.specification";
import {Order} from "../../interfaces";

export class OrderSpecificationBuilder extends AbstractSpecificationBuilder {
    buildWhereClauseFromSpecification<T>(specification: Specification<T>): WhereOptions<Order> {

        if (specification instanceof OrderIdSpecification) {
            return {orderId: specification.orderId};
        }

        return this.buildComplexSpecification(specification);
    }
}
