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

}