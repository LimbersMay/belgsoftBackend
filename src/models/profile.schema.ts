import {Column, ForeignKey, PrimaryKey, Table, Unique} from "sequelize-typescript";
import UserSchema from "./user.schema";

@Table
export class ProfileSchema {

    @PrimaryKey
    @Unique
    @Column
    profileId!: string;

    @Column
    @ForeignKey(() => UserSchema)
    userId!: string;

    @Column
    surname!: string;

    @Column
    phone!: string;

    @Column
    createdAt!: Date;

    @Column
    updatedAt!: Date;
}
