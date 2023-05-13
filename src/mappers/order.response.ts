import {OrderSchema} from "../models";

interface OrderResponseProps {
    orderId: string;
    customerName?: string;
    tableId: string;
    userId: string;
    orderStatusId: string;
    areaId: string;
    price: number;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
}

export class OrderResponse {
    private orderId: string;
    private customerName?: string;
    private tableId: string;
    private userId: string;
    private orderStatusId: string;
    private areaId: string;
    private price: number;
    private quantity: number;
    private createdAt: Date;
    private updatedAt: Date;

    constructor({ orderId, customerName, tableId, userId, orderStatusId, areaId, price, quantity, createdAt, updatedAt }: OrderResponseProps) {
        this.orderId = orderId;
        this.customerName = customerName;
        this.tableId = tableId;
        this.userId = userId;
        this.orderStatusId = orderStatusId;
        this.areaId = areaId;
        this.price = price;
        this.quantity = quantity;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static fromOrder(orderModel: OrderSchema) {
        return new OrderResponse({
            orderId: orderModel.orderId,
            customerName: orderModel.customerName,
            tableId: orderModel.tableId,
            userId: orderModel.userId,
            orderStatusId: orderModel.orderStatusId,
            areaId: orderModel.areaId,
            price: orderModel.price,
            quantity: orderModel.quantity,
            createdAt: orderModel.createdAt,
            updatedAt: orderModel.updatedAt
        });
    }
}
