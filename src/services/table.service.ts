import {v4 as uuidv4} from 'uuid';
import {TableSchema} from "../models";
import {TableResponse} from "../mappers";
import {CreateTableDTO} from "../controllers";
import {TABLE_ERRORS} from "../errors/table.errors";

export const getAllTables = async() => {
    const tables = await TableSchema.findAll({});
    return tables.map(table => TableResponse.fromTable(table));
}

export const createTable = async(table: CreateTableDTO, branchId: string) => {

    // check if the table number already exists
    const tableExists = await TableSchema.findOne({
        where: {
            number: table.number
        }
    });

    if (tableExists) {
        return TABLE_ERRORS.TABLE_ERROR_TABLE_ALREADY_EXISTS;
    }

    const newTable = await TableSchema.create({
        tableId: uuidv4(),
        branchId,
        number: table.number,
        customers: table.customers
    });

    return TableResponse.fromTable(newTable);
}
