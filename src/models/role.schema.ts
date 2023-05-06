import {Column, PrimaryKey, Table, Unique} from "sequelize-typescript";

@Table
export class RoleSchema {

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
