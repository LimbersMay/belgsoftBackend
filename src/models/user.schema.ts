import {Column, Model, PrimaryKey, Table, Unique} from "sequelize-typescript";

@Table
export class UserSchema extends Model{
    @PrimaryKey
    @Unique
    @Column
    userId!: string;

    @Column
    name!: string;

    @Column
    surname!: string;

    @Unique
    @Column
    email!: string;

    @Column
    role!: string;

    @Column
    password!: string;

    @Column
    lastname!: string;

    @Column
    createdAt!: Date;

    @Column
    updatedAt!: Date;
}

export default UserSchema;
