import {
    AllowNull,
    BelongsTo,
    Column,
    ForeignKey,
    HasMany,
    Model,
    PrimaryKey,
    Table,
    Unique
} from "sequelize-typescript";
import {AreaSchema, TableSchema, UserSchema, OrderStatusSchema, MenuSchema} from "./";
import {Order} from "../interfaces";

@Table
export class OrderSchema extends Model<Order> {

    @PrimaryKey
    @Unique
    @Column
    orderId!: string;

    @Column
    branchId!: string;

    @AllowNull
    @Column
    customerName?: string;

    @Column
    @ForeignKey(() => AreaSchema)
    areaId!: string;

    @HasMany(() => MenuSchema, 'menuId')
    menus!: MenuSchema[];

    @BelongsTo(() => AreaSchema)
    area!: AreaSchema;

    @Column
    @ForeignKey(() => TableSchema)
    tableId!: string;

    @BelongsTo(() => TableSchema)
    table!: TableSchema;

    @Column
    @ForeignKey( () => UserSchema)
    userId!: string;

    @BelongsTo(() => UserSchema)
    user!: UserSchema;

    @Column
    @ForeignKey( () => OrderStatusSchema)
    orderStatusId!: string;

    @BelongsTo(() => OrderStatusSchema)
    orderStatus!: OrderStatusSchema;

    @Column
    price!: number;

    @Column
    quantity!: number;

    @Column
    createdAt!: Date;

    @Column
    updatedAt!: Date;
}
