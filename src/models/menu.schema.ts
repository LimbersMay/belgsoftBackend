import {Column, ForeignKey, Model, PrimaryKey, Table, Unique} from "sequelize-typescript";
import {CategorySchema} from "./";
import {Menu} from "../interfaces/menu.interface";

@Table
export class MenuSchema extends Model<Menu>{
    @PrimaryKey
    @Unique
    @Column
    menuId!: string;

    @Column
    @ForeignKey(() => CategorySchema)
    categoryId!: string;

    @Column
    name!: string;

    @Column
    description!: string;

    @Column
    price!: number;

    @Column
    isAvailable!: boolean;

    @Column
    image!: string;

    @Column
    createdAt!: Date;

    @Column
    updatedAt!: Date;
}