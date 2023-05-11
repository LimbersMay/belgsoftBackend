import {OrderSchema} from "../models";

interface OrderResponseProps {
    orderId: string;
    customerId?: string;
    tableId: string;
    userId: string;
    orderStatusId: string;
    menuId: string;
    areaId: string;
    price: number;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
}

export class OrderResponse {
    private orderId: string;
    private customerId?: string;
    private tableId: string;
    private userId: string;
    private orderStatusId: string;
    private menuId: string;
    private areaId: string;
    private price: number;
    private quantity: number;
    private createdAt: Date;
    private updatedAt: Date;

    constructor({ orderId, customerId, tableId, userId, orderStatusId, menuId, areaId, price, quantity, createdAt, updatedAt }: OrderResponseProps) {
        this.orderId = orderId;
        this.customerId = customerId;
        this.tableId = tableId;
        this.userId = userId;
        this.orderStatusId = orderStatusId;
        this.menuId = menuId;
        this.areaId = areaId;
        this.price = price;
        this.quantity = quantity;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static fromOrder(orderModel: OrderSchema) {
        return new OrderResponse({
            orderId: orderModel.orderId,
            customerId: orderModel.customerId,
            tableId: orderModel.tableId,
            userId: orderModel.userId,
            orderStatusId: orderModel.orderStatusId,
            menuId: orderModel.menuId,
            areaId: orderModel.areaId,
            price: orderModel.price,
            quantity: orderModel.quantity,
            createdAt: orderModel.createdAt,
            updatedAt: orderModel.updatedAt
        });
    }
}
