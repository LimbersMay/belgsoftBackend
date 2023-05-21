import {OrderSchema} from "../models";
import {OrderResponse} from "../mappers";
import {Specification} from "../specifications";
import {OrderSpecificationBuilder} from "../specifications/sequelize/order-specification.builder";

type OrderSpecification = Specification<string> | Specification<string>[];

const orderSpecificationBuilder = new OrderSpecificationBuilder();

export const findAllOrders = async (specifications: OrderSpecification) => {
    const whereQuery = orderSpecificationBuilder.buildWhereClauseFromSpecifications(specifications);

    const orders = await OrderSchema.findAll({
        where: whereQuery
    });

    return orders.map(order => OrderResponse.fromOrder(order));
}
