import {ExpressMiddlewareInterface} from "routing-controllers";
import {NextFunction, Request, Response} from "express";

export class PermissionChecker implements ExpressMiddlewareInterface {
    async use(req: Request, res: Response, next: NextFunction) {

    }
}
