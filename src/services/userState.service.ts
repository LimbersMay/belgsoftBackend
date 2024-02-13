import {promiseHandler} from "../helpers";
import {UserStateSchema} from "../models";
import {Err, Ok, Result} from "ts-results-es";
import {UserStateResponse} from "../mappers/UserState.response";
import {UserStateError} from "../errors/userState.error";

export const findAllUserStates = async (): Promise<Result<UserStateResponse[], UserStateError.USER_STATE_ERROR_CANNOT_GET_USER_STATES>> => {

    const userStates = await promiseHandler(
        UserStateSchema.findAll()
    )

    if (userStates.isErr()) {
        return Err(UserStateError.USER_STATE_ERROR_CANNOT_GET_USER_STATES);
    }

    return Ok(userStates.unwrap().map(UserStateResponse.fromUserState));
}
