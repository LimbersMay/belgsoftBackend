import {Response} from "express";
import {
    Authorized,
    Body,
    CurrentUser,
    Get,
    JsonController, Params,
    Post,
    Put,
    Res,
    UseBefore
} from "routing-controllers";
import {IsAuthenticated} from "../../middlewares";
import {createOrder, findAllOrders, updateOrder} from "../../services";
import {handleHttp} from "../../utils";
import {UserResponse} from "../../mappers";
import {BranchIdSpecification, OrderIdSpecification} from "../../specifications";
import {OrderErrors} from "../../errors";
import {CreateOrderDTO} from "./validators/order.create";
import {OrderIdDTO, UpdateOrderDTO} from "./validators/order.update";

@JsonController('/orders')
@UseBefore(IsAuthenticated)
export class OrderController {

    @Get('/')
    @Authorized(['ADMIN', 'SUPER_USER'])
    public async getAll(
        @Res() res: Response,
        @CurrentUser() {branchId}: UserResponse
    ) {
        try {
            return await findAllOrders(new BranchIdSpecification(branchId));
        } catch (e) {
            return handleHttp(res, OrderErrors.ORDER_ERROR_CANNOT_GET_ORDERS, e);
        }
    }

    @Post('/')
    @Authorized(['ADMIN', 'SUPER_USER', 'WAITER'])
    public async create(
        @Res() res: Response,
        @Body({validate: true}) orderDTO: CreateOrderDTO,
        @CurrentUser() {branchId, userId}: UserResponse
    ) {
        try {
            return await createOrder(orderDTO, branchId, userId);
        } catch (e) {
            return handleHttp(res, OrderErrors.ORDER_ERROR_CANNOT_CREATE_ORDER, e);
        }
    }

    @Put('/:id')
    @Authorized(['ADMIN', 'SUPER_USER'])
    public async update(
        @Res() res: Response,
        @CurrentUser() {branchId}: UserResponse,
        @Params({ validate: true}) { id }: OrderIdDTO,
        @Body({validate: true}) orderDTO: UpdateOrderDTO
    ) {
        try {
            const affectedCount = await updateOrder(orderDTO, [
                new BranchIdSpecification(branchId),
                new OrderIdSpecification(id)
            ]);

            return {
                affectedCount: affectedCount
            }
        } catch (e) {
            return handleHttp(res, OrderErrors.ORDER_ERROR_CANNOT_UPDATE_ORDER, e);
        }
    }
}