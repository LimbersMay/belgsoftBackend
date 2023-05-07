import {Column, Model, PrimaryKey, Table, Unique} from "sequelize-typescript";

@Table
export class UserTypeSchema extends Model{
    @PrimaryKey
    @Unique
    @Column
    userTypeId!: string;

    @Column
    name!: string;

    @Column
    value!: string;

    @Column
    createdAt!: Date;

    @Column
    updatedAt!: Date;
}