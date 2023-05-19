import {Get, JsonController, Res, UseBefore} from "routing-controllers";
import {IsAuthenticated} from "../middlewares";
import {getAllOrders} from "../services/order.service";
import {handleHttp} from "../utils";
import {Response} from "express";

@JsonController('/orders')
export class OrderController {

    @Get('/')
    @UseBefore(IsAuthenticated)
    public async getAll(@Res() res: Response) {

        try {
            return await getAllOrders();
        } catch (e) {
            return handleHttp(res, "ERROR_GET_ORDERS", e);
        }
    }
}
