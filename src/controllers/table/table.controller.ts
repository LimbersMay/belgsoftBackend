import {
    Authorized,
    Body,
    CurrentUser,
    Get,
    JsonController,
    Param,
    Post,
    Put,
    Res,
    UseBefore
} from "routing-controllers";
import {IsAuthenticated} from "../../middlewares";
import {Response} from "express";
import {createTable, findAllTables, updateTable} from "../../services";
import {handleHttp} from "../../utils";
import {CreateTableDTO} from "./validators/table.create";
import {TABLE_ERRORS} from "../../errors/table.errors";
import {UpdateTableDTO} from "./validators/table.update";
import {UserResponse} from "../../mappers";

@JsonController('/tables')
export class TableController {

    @Get('/')
    @UseBefore(IsAuthenticated)
    public async getAll(@Res() res: Response) {
        try {
            return await findAllTables();
        } catch (e) {
            return handleHttp(res, TABLE_ERRORS.TABLE_ERROR_CANNOT_GET_TABLES, e);
        }
    }

    @UseBefore(IsAuthenticated)
    @Authorized('ADMIN')
    @Post('/')
    public async createTable(@Res() res: Response, @Body({validate: true}) createTableDTO: CreateTableDTO, @CurrentUser({required: true}) user: UserResponse) {
        try {
            const responseTable = await createTable(createTableDTO, user.branchId);

            if (typeof responseTable === 'string') {
                return handleHttp(res, responseTable);
            }

            return responseTable;
        } catch (e) {
            return handleHttp(res, TABLE_ERRORS.TABLE_ERROR_CANNOT_CREATE_TABLE, e);
        }
    }

    @UseBefore(IsAuthenticated)
    @Authorized('ADMIN')
    @Put('/:id')
    public async updateTable(@Res() res: Response, @Param('id') id: string, @Body({ validate: true}) updateTableDTO: UpdateTableDTO) {

        try {
            const responseTable = await updateTable(id, updateTableDTO);

            if (typeof responseTable === 'string') {
                return handleHttp(res, responseTable);
            }

            return responseTable;
        } catch (e) {
            return handleHttp(res, TABLE_ERRORS.TABLE_ERROR_CANNOT_UPDATE_TABLE, e);
        }
    }
}
