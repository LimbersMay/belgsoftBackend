import {ExpressMiddlewareInterface} from "routing-controllers";
import {NextFunction, Request, Response} from "express";
import {verifyToken} from "../utils";

export const permissionChecker = (requiredRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        // create the middleware logic
        const middleware = new PermissionChecker(requiredRoles);

        // use the middleware
        middleware.use(req, res, next).then();
    }
}

export class PermissionChecker implements ExpressMiddlewareInterface {
    constructor(private readonly requiredRoles: string[]) {
        this.requiredRoles = requiredRoles;
    }

    async use(req: Request, res: Response, next: NextFunction) {
        const token = req.headers["x-token"];

        const payload = await verifyToken(`${token}`);

        if (!this.requiredRoles.includes(payload.role)) {
            return next({
                status: 401,
                message: "You don't have permission to perform this action"
            })
        }

        return next();
    }
}
