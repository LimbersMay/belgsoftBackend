import {Get, JsonController, UseBefore} from "routing-controllers";
import {IsAuthenticated} from "../middlewares";

@JsonController("/orders")
export class OrderController {

    @Get("/")
    @UseBefore(IsAuthenticated)
    getAll() {
        return "This action returns all orders with a valid session";
    }
}
