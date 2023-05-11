import {Column, HasOne, Model, PrimaryKey, Table, Unique} from "sequelize-typescript";
import UserSchema from "./user.schema";

@Table
export class RoleSchema extends Model {

    @PrimaryKey
    @Unique
    @Column
    roleId!: string;

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
