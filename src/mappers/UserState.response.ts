import {UserStateSchema} from "../models";

export class UserStateResponse {

    private userStateId: string;
    private name: string;
    private state: string;
    private createdAt: Date;
    private updatedAt: Date;

    constructor(
        userStateId: string,
        name: string,
        state: string,
        createdAt: Date,
        updatedAt: Date
    ) {
        this.userStateId = userStateId;
        this.name = name;
        this.state = state;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static fromUserState(userState: UserStateSchema) {
        return new UserStateResponse(
            userState.userStateId,
            userState.name,
            userState.state,
            userState.createdAt,
            userState.updatedAt
        )
    }
}
