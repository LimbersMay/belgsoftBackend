import {v4 as uuidv4} from 'uuid';
import {TableSchema} from "../models";
import {TableResponse} from "../mappers";
import {CreateTableDTO} from "../controllers";
import {TABLE_ERRORS} from "../errors/table.errors";
import {UpdateTableDTO} from "../controllers/table/validators/table.update";

export const findAllTables = async () => {
    const tables = await TableSchema.findAll({});
    return tables.map(table => TableResponse.fromTable(table));
}

const findTableBy = async (id: string) => {
    const table = await TableSchema.findOne({
        where: {
            tableId: id
        }
    });

    return !!table;
}

export const createTable = async (table: CreateTableDTO, branchId: string) => {

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

export const updateTable = async (id: string, table: UpdateTableDTO) => {

    const tableExists = await findTableBy(id);

    if (!tableExists) {
        return TABLE_ERRORS.TABLE_ERROR_TABLE_DOES_NOT_EXIST;
    }

    const [ affectedFields ] = await TableSchema.update({
        number: table.number,
        customers: table.customers
    }, {
        where: {
            tableId: id
        }
    });

    return {
        affectedFields
    };
}