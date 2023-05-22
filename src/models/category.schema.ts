import {Column, HasMany, Model, PrimaryKey, Table, Unique} from "sequelize-typescript";
import {MenuSchema} from "./menu.schema";


@Table
export class CategorySchema extends Model{
    @PrimaryKey
    @Unique
    @Column
    categoryId!: string;

    @HasMany(() => MenuSchema, )
    menuSchemas!: MenuSchema[];

    @Column
    name!: string;

    @Column
    description!: string;

    @Column
    createdAt!: Date;

    @Column
    updatedAt!: Date;
}