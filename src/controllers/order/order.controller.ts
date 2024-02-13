import {Response} from "express";
import {
    Authorized,
    Body,
    CurrentUser, Delete,
    Get,
    JsonController,
    Params,
    Post,
    Put,
    Res,
    UseBefore
} from "routing-controllers";
import {IsAuthenticated} from "../../middlewares";
import {checkoutOrder, createOrder, deleteOrder, findAllOrders, printOrder, updateOrder} from "../../services";
import {handleHttp} from "../../utils";
import {UserResponse} from "../../mappers";
import {
    AreaIdSpecification,
    BranchIdSpecification,
    OrderIdSpecification,
    TableIdSpecification,
    UserIdSpecification
} from "../../specifications";
import {OrderErrors} from "../../errors";
import {CreateOrderDTO} from "./validators/order.create";
import {OrderIdDTO, UpdateOrderDTO} from "./validators/order.update";
import {PrintOrderDTO} from "./validators/order.print";
import {TableIdDTO} from "../table/validators/table.update";

@JsonController('/orders')
@UseBefore(IsAuthenticated)
export class OrderController {

    @Get('/')
    @Authorized(['ADMIN', 'SUPER_USER', 'WAITER'])
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

    @Get('/user')
    @Authorized(['ADMIN', 'WAITER', 'SUPER_USER'])
    public async getAllOrdersByUser(
        @CurrentUser() { userId }: UserResponse,
        @Res() res: Response
    ) {
        try {
            return await findAllOrders(new UserIdSpecification(userId));
        } catch (e) {
            return handleHttp(res, OrderErrors.ORDER_ERROR_CANNOT_GET_ORDERS, e);
        }
    }

    @Get('/table/:id')
    @Authorized(['ADMIN', 'SUPER_USER', 'WAITER'])
    public async getAllOrdersByTable(
        @Res() res: Response,
        @CurrentUser() {branchId}: UserResponse,
        @Params({ validate: true}) { id: tableId }: TableIdDTO,
    ) {
        try {
            // Filter all orders from a specific table
            const orders = await findAllOrders([
                new BranchIdSpecification(branchId),
                new TableIdSpecification(tableId)
            ]);

            // Get all menus from the ordersId
            return orders.map(order => order.menuItems);
        } catch (e) {
            return handleHttp(res, OrderErrors.ORDER_ERROR_CANNOT_GET_ORDERS, e);
        }
    }

    @Get('/area')
    @Authorized(['ADMIN', 'SUPER_USER'])
    public async getAllOrdersByArea(
        @Res() res: Response,
        @CurrentUser() {branchId}: UserResponse,
        @Params({ validate: true}) { id: tableId }: TableIdDTO,
    ) {
        try {
            return await findAllOrders(new AreaIdSpecification(tableId));
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
    @Authorized(['ADMIN', 'SUPER_USER', 'WAITER'])
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

    @Post('/:id/checkout')
    @Authorized(['ADMIN', 'SUPER_USER', 'WAITER'])
    public async checkout(
        @Res() res: Response,
        @CurrentUser() {branchId}: UserResponse,
        @Params({ validate: true}) { id }: OrderIdDTO
    ) {
        try {
            return await checkoutOrder([
                new BranchIdSpecification(branchId),
                new OrderIdSpecification(id)
            ]);
        } catch (e) {
            return handleHttp(res, OrderErrors.ORDER_ERROR_CANNOT_UPDATE_ORDER, e);
        }
    }


    @Authorized(['ADMIN', 'SUPER_USER'])
    @Delete('/:id')
    public async delete(
        @Res() res: Response,
        @CurrentUser() {branchId}: UserResponse,
        @Params({ validate: true}) { id }: OrderIdDTO
    ) {
        try {
            const affectedCount = await deleteOrder([
                new BranchIdSpecification(branchId),
                new OrderIdSpecification(id)
            ]);

            return {
                affectedCount: affectedCount
            }
        } catch (e) {
            return handleHttp(res, OrderErrors.ORDER_ERROR_CANNOT_DELETE_ORDER, e);
        }
    }

    @Post('/print')
    public async print(
        @Body({ validate: true }) printOrderDTO: PrintOrderDTO
    ) {

        printOrder(printOrderDTO);

        return {
            ok: true
        }
    }
}