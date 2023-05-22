import {v4 as uuidv4} from 'uuid';
import {OrderMenuSchema, OrderSchema} from "../models";
import {OrderResponse} from "../mappers";
import {Specification} from "../specifications";
import {OrderSpecificationBuilder} from "../specifications/sequelize";
import {CreateOrderDTO} from "../controllers/order/validators/order.create";
import {UpdateOrderDTO} from "../controllers/order/validators/order.update";

type OrderSpecification = Specification<string> | Specification<string>[];

const orderSpecificationBuilder = new OrderSpecificationBuilder();

export const findAllOrders = async (specifications: OrderSpecification) => {
    const whereQuery = orderSpecificationBuilder.buildWhereClauseFromSpecifications(specifications);

    const orders = await OrderSchema.findAll({
        where: whereQuery
    });

    return orders.map(order => OrderResponse.fromOrder(order));
}

export const createOrder = async (order: CreateOrderDTO, branchId: string, userId: string) => {

    /*
        {
            "menuId": "5aced550-a1e8-4643-a7c6-ab98954db2d2",
            "quantity": 4,
            "price": 55
        },
        {
            "menuId": "5aced550-a1e8-4643-a7c6-ab98954db2d2",
            "quantity": 4,
            "price": 55
        }
     */

    // calculate the total price of the order
    const totalPrice = order.menuItems.reduce((previousValue, currentValue) => currentValue.price * currentValue.quantity + previousValue, 0);
    const totalQuantity = order.menuItems.reduce((previousValue, currentValue) => currentValue.quantity + previousValue, 0);

    const orderInstance = await OrderSchema.create({
        ...order,
        orderId: uuidv4(),
        price: totalPrice,
        quantity: totalQuantity,
        branchId,
        userId
    });

    const orderMenuRegistries = order.menuItems.map(menuItem => (
        OrderMenuSchema.create({
            orderMenuId: uuidv4(),
            orderId: orderInstance.orderId,
            menuId: menuItem.menuId,
            quantity: menuItem.quantity,
            price: menuItem.price
        })
    ))

    // we save the orderMenuRegistries after the orderInstance is saved
    await Promise.all(orderMenuRegistries);

    return OrderResponse.fromOrder(orderInstance);
}

export const updateOrder = async (orderDTO: UpdateOrderDTO, specifications: OrderSpecification) => {

    const whereQuery = orderSpecificationBuilder.buildWhereClauseFromSpecifications(specifications);

    const [ affectedCount ] = await OrderSchema.update(orderDTO, {
        where: whereQuery
    });

    return affectedCount;
}
