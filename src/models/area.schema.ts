import {Column, Model, PrimaryKey, Table} from "sequelize-typescript";
import {Area} from "../interfaces/area.interface";

@Table
export class AreaSchema extends Model<Area>{
    @PrimaryKey
    @Column
    areaId!: string;

    @Column
    branchId!: string;

    @Column
    name!: string;

    @Column
    description!: string;

    @Column
    createdAt!: Date;

    @Column
    updatedAt!: Date;
}