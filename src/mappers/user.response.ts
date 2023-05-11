import {UserSchema} from "../models";

export class UserResponse {
    userId: string;
    name: string;
    email: string;
    role: string;
    userType: string;
    userState: string;

    constructor(userId: string, name: string, email: string, role: string, userType: string, userState: string) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.role = role;
        this.userType = userType;
        this.userState = userState;
    }

    public static fromUser(user: UserSchema): UserResponse {
        return new UserResponse(
            user.userId,
            user.name,
            user.email,
            user.role.name,
            user.userType.name,
            user.userState.name
        )
    }

}