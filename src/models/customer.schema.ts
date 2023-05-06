import {Column, Model, PrimaryKey, Table, Unique} from "sequelize-typescript";

@Table
export class CustomerSchema extends Model {

    @PrimaryKey
    @Unique
    @Column
    customerId!: string;

    @Column
    name!: string;

    @Column
    surname!: string;

    @Column
    phone!: string;

    @Column
    createdAt!: Date;

    @Column
    updatedAt!: Date;
}
