import {OrderSchema} from "../models";
import {MenuResponse} from "./menu.response";

interface OrderResponseProps {
    orderId: string;
    customerName?: string;
    tableId: string;
    tableNumber: string;
    menus: MenuResponse[];
    userName: string;
    orderStatus: string;
    area: string;
    price: number;
    quantity: number;
    createdAt: Date;
}

export class OrderResponse {
    private orderId: string;
    private customerName?: string;
    private tableNumber: string;
    menus: MenuResponse[];
    private tableId: string;
    private userName: string;
    private orderStatus: string;
    private area: string;
    private price: number;
    private quantity: number;
    private createdAt: Date;

    constructor({ orderId, customerName, tableId, menus, tableNumber, userName, orderStatus, area, price, quantity, createdAt }: OrderResponseProps) {
        this.orderId = orderId;
        this.customerName = customerName;
        this.tableNumber = tableNumber;
        this.menus = menus;
        this.tableId = tableId;
        this.userName = userName;
        this.orderStatus = orderStatus;
        this.area = area;
        this.price = price;
        this.quantity = quantity;
        this.createdAt = createdAt;
    }

    public static fromOrder(orderModel: OrderSchema) {
        return new OrderResponse({
            orderId: orderModel.orderId,
            customerName: orderModel.customerName,
            tableId: orderModel.tableId,
            menus: orderModel.menus.map(menuSchema => MenuResponse.fromMenu(menuSchema)),
            tableNumber: orderModel.table.number,
            userName: orderModel.user.name,
            orderStatus: orderModel.orderStatus.name,
            area: orderModel.area.name,
            price: orderModel.price,
            quantity: orderModel.quantity,
            createdAt: orderModel.createdAt,
        });
    }
}
