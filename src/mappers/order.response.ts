import {OrderSchema} from "../models";
import {MenuResponse} from "./menu.response";

interface OrderResponseProps {
    orderId: string;
    customerName?: string;
    tableId: string;
    areaId: string;
    tableNumber: string;
    menuItems: MenuResponse[];
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
    menuItems: MenuResponse[];
    private tableId: string;
    private userName: string;
    private orderStatus: string;
    private area: string;
    private areaId: string;
    private price: number;
    private quantity: number;
    private createdAt: Date;

    constructor({ orderId, customerName, tableId, areaId, menuItems, tableNumber, userName, orderStatus, area, price, quantity, createdAt }: OrderResponseProps) {
        this.orderId = orderId;
        this.customerName = customerName;
        this.tableNumber = tableNumber;
        this.menuItems = menuItems;
        this.tableId = tableId;
        this.areaId = areaId;
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
            menuItems: orderModel.menuItems.map(menuSchema => MenuResponse.fromMenu(menuSchema)),
            tableNumber: orderModel.table.number,
            userName: orderModel.user.name,
            orderStatus: orderModel.orderStatus.name,
            area: orderModel.area.name,
            areaId: orderModel.area.areaId,
            price: orderModel.price,
            quantity: orderModel.quantity,
            createdAt: orderModel.createdAt,
        });
    }
}
