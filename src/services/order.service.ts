import { v4 as uuidv4 } from 'uuid';
import {OrderSchema} from "../models";
import {OrderResponse} from "../mappers";
import {Specification} from "../specifications";
import {OrderSpecificationBuilder} from "../specifications/sequelize/order-specification.builder";
import {CreateOrderDTO} from "../controllers/order/validators/order.create";

type OrderSpecification = Specification<string> | Specification<string>[];

const orderSpecificationBuilder = new OrderSpecificationBuilder();

export const findAllOrders = async (specifications: OrderSpecification) => {
    const whereQuery = orderSpecificationBuilder.buildWhereClauseFromSpecifications(specifications);

    const orders = await OrderSchema.findAll({
        where: whereQuery
    });

    return orders.map(order => OrderResponse.fromOrder(order));
}

export const createOrder = async (order: CreateOrderDTO, branchId: string) => {

    const orderInstance = await OrderSchema.create({
        orderId: uuidv4(),
        branchId,
        ...order
    });

    return OrderResponse.fromOrder(orderInstance);
}
