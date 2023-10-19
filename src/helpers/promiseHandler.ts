/*
    This function is used to handle promises in a more elegant way.
    It returns a Result object, which can be either Ok or Err.

    The function has two generic types, T and K
    T is the type of the value returned if the promise is resolved successfully
    K is the type of the value returned if the promise is rejected

    Example:
    Look at the service updateUser function in src/services/user.service.ts
    The definition of the function is:
    async function updateUser(updateUserDTO: UpdateUserDTO, specifications: Criteria): Promise<Result<[number], UserUpdateErrors>>

    In this case, T is [number] and K is UserUpdateErrors
 */

import {Err, Ok, Result} from "ts-results-es";

export const promiseHandler = async <T>(prom: Promise<T>): Promise<Result<T, any>> => {
    try {
        const result = await prom;
        return Ok(result);
    } catch (e : any) {
        return Err(e);
    }
}
