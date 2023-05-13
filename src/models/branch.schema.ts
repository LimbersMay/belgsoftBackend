import {Column, Model, PrimaryKey, Table, Unique} from "sequelize-typescript";
import {Branch} from "../interfaces/branch.interface";

@Table
export class BranchSchema extends Model<Branch> {

    @PrimaryKey
    @Unique
    @Column
    branchId!: string;

    @Column
    name!: string;

    @Column
    address!: string;

    @Column
    city!: string;

    @Column
    state!: string;

    @Column
    phone!: string;

    @Column
    createdAt!: Date;

    @Column
    updatedAt!: Date;
}
