import {Column, HasOne, Model, PrimaryKey, Table, Unique} from "sequelize-typescript";
import UserSchema from "./user.schema";

@Table
export class UserTypeSchema extends Model{
    @PrimaryKey
    @Unique
    @Column
    userTypeId!: string;

    @HasOne(() => UserSchema, 'userId')
    user!: UserSchema;

    @Column
    name!: string;

    @Column
    value!: string;

    @Column
    createdAt!: Date;

    @Column
    updatedAt!: Date;
}