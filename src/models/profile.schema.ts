import {Column, ForeignKey, Model, PrimaryKey, Table, Unique} from "sequelize-typescript";
import UserSchema from "./user.schema";

@Table
export class ProfileSchema extends Model{

    @PrimaryKey
    @Unique
    @Column
    profileId!: string;

    @Column
    @ForeignKey(() => UserSchema)
    userId!: string;

    @Column
    firstSurname!: string;

    @Column
    secondSurname!: string;

    @Column
    phone!: string;

    @Column
    createdAt!: Date;

    @Column
    updatedAt!: Date;
}
