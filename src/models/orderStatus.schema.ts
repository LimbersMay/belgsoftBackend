import {Column, Model, PrimaryKey, Table, Unique} from "sequelize-typescript";

@Table
export class OrderStatusSchema extends Model{
    @PrimaryKey
    @Unique
    @Column
    orderStatusId!: string;

    @Column
    name!: string;

    @Column
    description!: string;

    @Column
    createdAt!: Date;

    @Column
    updatedAt!: Date;
}
