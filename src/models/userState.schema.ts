import {Column, PrimaryKey, Table, Unique} from "sequelize-typescript";

@Table
export class UserStateSchema {

    @PrimaryKey
    @Unique
    @Column
    userId!: string;

    @Column
    name!: string;

    @Column
    state!: string;

    @Column
    createdAt!: Date;

    @Column
    updatedAt!: Date;
}