import { Request, Response } from "express";
import {Get, JsonController, Req, Res, UseBefore} from "routing-controllers";
import {IsAuthenticated} from "../../../middlewares";
import {findAllUserStates} from "../../../services/userState.service";
import {handleHttp} from "../../../utils";

@UseBefore(IsAuthenticated)
@JsonController("/userState")
export class UserStateController {
    constructor() {
    }

    @Get("/")
    public async getUserStates(
        @Res() res: Response,
        @Req() req: Request
    ) {

        const userStates = await findAllUserStates();

        if (userStates.isOk()) return userStates.value;

        return handleHttp(res, userStates.error, userStates.error, 500);
    }
}
