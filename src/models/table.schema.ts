import {Column, Model, PrimaryKey, Table, Unique} from "sequelize-typescript";

@Table
export class TableSchema extends Model{
    @PrimaryKey
    @Unique
    @Column
    tableId!: string;

    @Column
    number!: string;

    @Column
    customers!: number;

    @Column
    createdAt!: Date;

    @Column
    updatedAt!: Date;
}

export default TableSchema;