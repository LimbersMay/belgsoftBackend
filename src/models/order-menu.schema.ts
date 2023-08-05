import {Column, ForeignKey, Model, PrimaryKey, Table, Unique} from "sequelize-typescript";
import {MenuSchema} from "./menu.schema";
import {OrderSchema} from "./order.schema";
import {OrderMenu} from "../interfaces/order-menu.interface";

@Table
export class OrderMenuSchema extends Model<OrderMenu> {

    @PrimaryKey
    @Unique
    @Column
    menuOrderId!: string;

    @Column
    @ForeignKey(() => MenuSchema)
    menuId!: string;

    @Column
    @ForeignKey(() => OrderSchema)
    orderId!: string;

    @Column
    quantity!: number;

    @Column
    price!: number;

    @Column
    createdAt!: Date;

    @Column
    updatedAt!: Date;
}
