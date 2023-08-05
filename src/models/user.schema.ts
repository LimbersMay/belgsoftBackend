import {BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table, Unique} from "sequelize-typescript";
import {UserTypeSchema, UserStateSchema, RoleSchema, BranchSchema} from "./";
import {User} from "../interfaces";

@Table
export class UserSchema extends Model<User>{
    @PrimaryKey
    @Unique
    @Column
    userId!: string;

    @ForeignKey(() => UserSchema)
    @Column
    createdByUserId?: string;

    @Column
    @ForeignKey(() => BranchSchema)
    branchId!: string;

    @Column
    name!: string;

    @Unique
    @Column
    email!: string;

    @ForeignKey(() => RoleSchema)
    @Column
    roleId!: string;

    @BelongsTo(() => RoleSchema, 'roleId')
    role!: RoleSchema;

    @ForeignKey(() => UserTypeSchema)
    @Column
    userTypeId!: string;

    @BelongsTo(() => UserTypeSchema, 'userTypeId')
    userType!: UserTypeSchema;

    @ForeignKey(() => UserStateSchema)
    @Column
    userStateId!: string;

    @BelongsTo(() => UserStateSchema, 'userStateId')
    userState!: UserStateSchema;

    @Column
    password!: string;

    @Column
    createdAt!: Date;

    @Column
    updatedAt!: Date;
}