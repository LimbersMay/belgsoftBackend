import {
    Authorized,
    Body,
    CurrentUser,
    Delete,
    Get,
    JsonController,
    Params,
    Post,
    Put,
    Res,
    UseBefore
} from "routing-controllers";
import {IsAuthenticated} from "../../middlewares";
import {Response} from "express";
import {createTable, deleteTable, findAllTables, updateTable} from "../../services";
import {handleHttp} from "../../utils";
import {CreateTableDTO} from "./validators/table.create";
import {TABLE_ERRORS} from "../../errors/table.errors";
import {UpdateTableDTO, UpdateTableIdDTO} from "./validators/table.update";
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
            return await createTable(createTableDTO, user.branchId);
        } catch (e) {
            return handleHttp(res, TABLE_ERRORS.TABLE_ERROR_CANNOT_CREATE_TABLE, e);
        }
    }

    @UseBefore(IsAuthenticated)
    @Authorized('ADMIN')
    @Put('/:id')
    public async updateTable(@Res() res: Response, @Params({validate: true}) { id }: UpdateTableIdDTO, @Body({validate: true}) updateTableDTO: UpdateTableDTO) {

        try {
            const responseTable = await updateTable(id, updateTableDTO);

            return {
                affectedFields: responseTable
            };
        } catch (e) {
            return handleHttp(res, TABLE_ERRORS.TABLE_ERROR_CANNOT_UPDATE_TABLE, e);
        }
    }

    @UseBefore(IsAuthenticated)
    @Authorized('ADMIN')
    @Delete('/:id')
    public async deleteTable(@Res() res: Response, @Params({validate: true}) { id }: UpdateTableIdDTO) {
        try {
            const deleteResponse = await deleteTable(id);

            return {
                affectedFields: deleteResponse
            };
        } catch (e) {
            return handleHttp(res, TABLE_ERRORS.TABLE_ERROR_CANNOT_DELETE_TABLE, e);
        }
    }
}
