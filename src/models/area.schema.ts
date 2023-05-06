import {Column, Model, PrimaryKey, Table} from "sequelize-typescript";

@Table
export class AreaSchema extends Model{
    @PrimaryKey
    @Column
    areaId!: string;

    @Column
    name!: string;

    @Column
    description!: string;

    @Column
    createdAt!: Date;

    @Column
    updatedAt!: Date;
}