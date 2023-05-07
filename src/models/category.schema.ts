import {Column, Model, PrimaryKey, Table, Unique} from "sequelize-typescript";


@Table
export class CategorySchema extends Model{
    @PrimaryKey
    @Unique
    @Column
    categoryId!: string;

    @Column
    name!: string;

    @Column
    description!: string;

    @Column
    createdAt!: Date;

    @Column
    updatedAt!: Date;
}