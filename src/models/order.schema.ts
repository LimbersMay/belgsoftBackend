import {AllowNull, Column, ForeignKey, Model, PrimaryKey, Table, Unique} from "sequelize-typescript";
import {AreaSchema, TableSchema, UserSchema, OrderStatusSchema} from "./";

@Table
export class OrderSchema extends Model {

    @PrimaryKey
    @Unique
    @Column
    orderId!: string;

    @AllowNull
    @Column
    customerName?: string;

    @Column
    @ForeignKey(() => AreaSchema)
    areaId!: string;

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
    price!: number;

    @Column
    quantity!: number;

    @Column
    createdAt!: Date;

    @Column
    updatedAt!: Date;
}
