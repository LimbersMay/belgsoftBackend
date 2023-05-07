import {Column, ForeignKey, Model, PrimaryKey, Table, Unique} from "sequelize-typescript";
import {RoleSchema} from "./role.schema";
import {UserTypeSchema} from "./userType.schema";
import {UserStateSchema} from "./userState.schema";

@Table
export class UserSchema extends Model{
    @PrimaryKey
    @Unique
    @Column
    userId!: string;

    @Column
    name!: string;

    @Unique
    @Column
    email!: string;

    @ForeignKey(() => RoleSchema)
    @Column
    roleId!: string;

    @ForeignKey(() => UserTypeSchema)
    @Column
    userTypeId!: string;

    @ForeignKey(() => UserStateSchema)
    @Column
    userStateId!: string;

    @Column
    password!: string;

    @Column
    createdAt!: Date;

    @Column
    updatedAt!: Date;
}

export default UserSchema;
