import {Column, HasOne, Model, PrimaryKey, Table, Unique} from "sequelize-typescript";
import UserSchema from "./user.schema";

@Table
export class UserStateSchema extends Model{

    @PrimaryKey
    @Unique
    @Column
    userId!: string;

    @HasOne(() => UserSchema, 'userId')
    user!: UserSchema;

    @Column
    name!: string;

    @Column
    state!: string;

    @Column
    createdAt!: Date;

    @Column
    updatedAt!: Date;
}