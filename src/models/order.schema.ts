import {AllowNull, Column, ForeignKey, Model, PrimaryKey, Table, Unique} from "sequelize-typescript";
import {CustomerSchema} from "./customer.schema";
import TableSchema from "./table.schema";
import UserSchema from "./user.schema";
import {OrderStatusSchema} from "./orderStatus.schema";
import {MenuSchema} from "./menu.schema";
import {AreaSchema} from "./area.schema";

@Table
export class OrderSchema extends Model {

    @PrimaryKey
    @Unique
    @Column
    orderId!: string;

    @AllowNull
    @Column
    @ForeignKey(() => CustomerSchema)
    customerId?: string;

    @Column
    @ForeignKey(() => MenuSchema)
    menuId!: string;

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
