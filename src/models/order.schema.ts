import {BeforeInit, Column, ForeignKey, Model, PrimaryKey, Table, Unique} from "sequelize-typescript";
import {CustomerSchema} from "./customer.schema";
import TableSchema from "./table.schema";
import UserSchema from "./user.schema";
import {OrderStatusSchema} from "./orderStatus.schema";

@Table
export class OrderSchema extends Model {

    @PrimaryKey
    @Unique
    @Column
    orderId!: string;

    @Column
    @ForeignKey(() => CustomerSchema)
    customerId!: string;

    @Column
    @ForeignKey(() => TableSchema)
    tableId!: string;

    @Column
    @ForeignKey( () => UserSchema)
    userId!: string;

    @Column
    @ForeignKey( () => OrderStatusSchema)
    orderStatusId!: string;

    @Column
    createdAt!: string;

    @Column
    updatedAt!: string;
}
