import {Column, Model, PrimaryKey, Table, Unique} from "sequelize-typescript";

@Table
export class RoleSchema extends Model {

    @PrimaryKey
    @Unique
    @Column
    roleId!: string;

    @Column
    name!: string;

    @Column
    value!: string;

    @Column
    createdAt!: Date;

    @Column
    updatedAt!: Date;
}
