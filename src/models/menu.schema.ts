import {Column, ForeignKey, Model, PrimaryKey, Table, Unique} from "sequelize-typescript";
import {CategorySchema} from "./category.schema";

@Table
export class MenuSchema extends Model{
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
    status!: string;

    @Column
    image!: string;

    @Column
    createdAt!: Date;

    @Column
    updatedAt!: Date;
}