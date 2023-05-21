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
import {TableErrors} from "../../errors";
import {UpdateTableDTO, UpdateTableIdDTO} from "./validators/table.update";
import {UserResponse} from "../../mappers";

@JsonController('/tables')
@UseBefore(IsAuthenticated)
export class TableController {

    @Get('/')
    @Authorized('ADMIN')
    public async getAll(
        @Res() res: Response,
        @CurrentUser() { branchId }: UserResponse
    ) {
        try {
            return await findAllTables(branchId);
        } catch (e) {
            return handleHttp(res, TableErrors.TABLE_ERROR_CANNOT_GET_TABLES, e);
        }
    }

    @Authorized('ADMIN')
    @Post('/')
    public async createTable(
        @Res() res: Response,
        @Body({validate: true}) createTableDTO: CreateTableDTO,
        @CurrentUser({required: true}) user: UserResponse
    ) {
        try {
            return await createTable(createTableDTO, user.branchId);
        } catch (e) {
            return handleHttp(res, TableErrors.TABLE_ERROR_CANNOT_CREATE_TABLE, e);
        }
    }

    @Authorized('ADMIN')
    @Put('/:id')
    public async updateTable(
        @Res() res: Response,
        @Params({validate: true}) { id }: UpdateTableIdDTO,
        @Body({validate: true}) updateTableDTO: UpdateTableDTO,
        @CurrentUser() { branchId }: UserResponse
    ) {

        try {
            const responseTable = await updateTable(id, branchId, updateTableDTO);

            return {
                affectedFields: responseTable
            };
        } catch (e) {
            return handleHttp(res, TableErrors.TABLE_ERROR_CANNOT_UPDATE_TABLE, e);
        }
    }

    @Authorized('ADMIN')
    @Delete('/:id')
    public async deleteTable(
        @Res() res: Response,
        @Params({validate: true}) { id }: UpdateTableIdDTO,
        @CurrentUser() { branchId }: UserResponse
    ) {
        try {
            const deleteResponse = await deleteTable(id, branchId);

            return {
                affectedFields: deleteResponse
            };
        } catch (e) {
            return handleHttp(res, TableErrors.TABLE_ERROR_CANNOT_DELETE_TABLE, e);
        }
    }
}
