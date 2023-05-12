import {Body, Get, JsonController, Post, Res, UseBefore} from "routing-controllers";
import {IsAuthenticated, permissionChecker} from "../../middlewares";
import {Response} from "express";
import {getAllTables} from "../../services/table.service";
import {handleHttp} from "../../utils";
import {CreateTableDTO} from "./validators/table.create";

@JsonController('/tables')
export class TableController {

    @Get('/')
    @UseBefore(IsAuthenticated)
    public async getAll(@Res() res: Response) {

        try {
            return await getAllTables();
        } catch (e) {
            handleHttp(res, "CANNOT_GET_TABLES", e);
        }
    }

    @UseBefore(permissionChecker(['ADMIN']))
    @UseBefore(IsAuthenticated)
    @Post('/')
    public async createTable(@Res() res: Response, @Body({validate: true}) createTableDTO: CreateTableDTO) {
            try {
                return await getAllTables();
            } catch (e: any) {
                return handleHttp(res, "CANNOT_GET_TABLES", e);
            }
    }
}
