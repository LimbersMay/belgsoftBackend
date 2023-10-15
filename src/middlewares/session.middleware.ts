import {ExpressMiddlewareInterface} from "routing-controllers";
import {NextFunction, Request, Response} from "express";
import {AuthError} from "../errors";
import {verifyToken} from "../utils";

export class IsAuthenticated implements ExpressMiddlewareInterface {
        async use(req: Request, res: Response, next: NextFunction) {

            const jwtAuth = req.headers["x-token"];

            if (!jwtAuth) {
                return next({
                    status: 401,
                    message: AuthError.AUTH_ERROR_INVALID_SESSION
                });
            }

            try {
               await verifyToken(`${jwtAuth}`);
                return next();
            } catch (e) {
                return next({
                    status: 401,
                    message: AuthError.AUTH_ERROR_INVALID_SESSION
                });
            }
        }
}
