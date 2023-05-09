import {ExpressErrorMiddlewareInterface, Middleware} from "routing-controllers";
import {NextFunction, Request, Response} from "express";
import {HttpErrorHandler} from "../interfaces/httpError.interface";

@Middleware({ type: "after" })
export class ErrorMiddleware implements ExpressErrorMiddlewareInterface {
        error(error: HttpErrorHandler, request: Request, response: Response, next: NextFunction) {
            console.log("Error: ", error);
            response.status(error.status || 500);
            response.json({
                error: error.message
            });
            next();
        }
}
