import {BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table, Unique} from "sequelize-typescript";
import {BranchSchema, CategorySchema} from "./";
import {Menu} from "../interfaces";

@Table
export class MenuSchema extends Model<Menu>{
    @PrimaryKey
    @Unique
    @Column
    menuId!: string;

    @Column
    @ForeignKey(() => BranchSchema)
    branchId!: string;

    @Column
    @ForeignKey(() => CategorySchema)
    categoryId!: string;

    @BelongsTo(() => CategorySchema, 'categoryId')
    category!: CategorySchema

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