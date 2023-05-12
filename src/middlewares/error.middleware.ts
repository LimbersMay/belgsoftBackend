import {BadRequestError, ExpressErrorMiddlewareInterface, Middleware} from "routing-controllers";
import {NextFunction, Request, Response} from "express";
import {HttpErrorHandler} from "../interfaces/httpError.interface";
import {ValidationError} from "class-validator";

@Middleware({ type: "after" })
export class ErrorMiddleware implements ExpressErrorMiddlewareInterface {
        error(error: HttpErrorHandler | any, request: Request, response: Response, next: NextFunction) {

            if (error.errors) {

                // class-validator error
                const errors = error.errors.map((err: ValidationError) => {
                    return {
                        field: err.property,
                        constraints: err.constraints
                    }
                });

                response.status(400);
                response.json({
                    message: error.message,
                    errors
                });

            } else {
                // generic error handler
                response.status(error.status || 500);
                response.json({
                    error: error.message,
                });
            }

            return next();
        }
}
