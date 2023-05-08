import {UserSchema} from "../models";

export class UserResponse {
    userId: string;
    name: string;
    email: string;
    roleId: string;
    userTypeId: string;
    userStateId: string;

    constructor(userId: string, name: string, email: string, roleId: string, userTypeId: string, userStateId: string) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.roleId = roleId;
        this.userTypeId = userTypeId;
        this.userStateId = userStateId;
    }

    public static fromUser(user: UserSchema): UserResponse {
        return new UserResponse(
            user.userId,
            user.name,
            user.email,
            user.roleId,
            user.userTypeId,
            user.userStateId
        )
    }

}