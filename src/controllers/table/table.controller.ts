import {Body, Get, JsonController, Post, Res, UseBefore} from "routing-controllers";
import {IsAuthenticated, permissionChecker} from "../../middlewares";
import {Response} from "express";
import {getAllTables} from "../../services";
import {handleHttp} from "../../utils";
import {CreateTableDTO} from "./validators/table.create";
import {TABLE_ERRORS} from "../../errors/table.errors";

@JsonController('/tables')
export class TableController {

    @Get('/')
    @UseBefore(IsAuthenticated)
    public async getAll(@Res() res: Response) {
        try {
            return await getAllTables();
        } catch (e) {
            return handleHttp(res, TABLE_ERRORS.ERROR_CANNOT_GET_TABLES, e);
        }
    }

    @UseBefore(permissionChecker(['ADMIN']))
    @UseBefore(IsAuthenticated)
    @Post('/')
    public async createTable(@Res() res: Response, @Body({validate: true}) createTableDTO: CreateTableDTO) {
        try {
            return await getAllTables();
        } catch (e) {
            return handleHttp(res, TABLE_ERRORS.ERROR_CANNOT_CREATE_TABLE, e);
        }
    }
}
