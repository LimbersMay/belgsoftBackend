import {Response} from "express";
import {Authorized, Body, CurrentUser, Get, JsonController, Post, Res, UseBefore} from "routing-controllers";
import {IsAuthenticated} from "../../middlewares";
import {createOrder, findAllOrders} from "../../services";
import {handleHttp} from "../../utils";
import {UserResponse} from "../../mappers";
import {BranchIdSpecification} from "../../specifications";
import {OrderErrors} from "../../errors";
import {CreateOrderDTO} from "./validators/order.create";

@JsonController('/orders')
@UseBefore(IsAuthenticated)
export class OrderController {

    @Get('/')
    @Authorized(['ADMIN', 'SUPER_USER'])
    public async getAll(
        @Res() res: Response,
        @CurrentUser() { branchId }: UserResponse
    ) {
        try {
            return await findAllOrders(new BranchIdSpecification(branchId));
        } catch (e) {
            return handleHttp(res, OrderErrors.ORDER_ERROR_CANNOT_GET_ORDERS, e);
        }
    }

    @Post('/')
    @Authorized(['ADMIN', 'SUPER_USER'])
    public async create(
        @Res() res: Response,
        @Body({validate: true}) orderDTO: CreateOrderDTO,
        @CurrentUser() { branchId }: UserResponse
    ) {
        try {
            return await createOrder(orderDTO, branchId);
        } catch (e) {
            return handleHttp(res, OrderErrors.ORDER_ERROR_CANNOT_CREATE_ORDER, e);
        }
    }
}
