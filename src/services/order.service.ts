import {OrderSchema} from "../models";
import {OrderResponse} from "../mappers/order.response";

export const getAllOrders = async () => {
    const orders = await OrderSchema.findAll({});
    return orders.map(order => OrderResponse.fromOrder(order));
}
