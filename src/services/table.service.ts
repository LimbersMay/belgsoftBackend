import {v4 as uuidv4} from 'uuid';
import {TableSchema} from "../models";
import {TableResponse} from "../mappers";
import {CreateTableDTO} from "../controllers";
import {UpdateTableDTO} from "../controllers/table/validators/table.update";

export const findAllTables = async () => {
    const tables = await TableSchema.findAll({});
    return tables.map(table => TableResponse.fromTable(table));
}

export const findTableByQuery = async (query: Record<any, any>) => {
    return await TableSchema.findOne({
        where: {
            ...query
        }
    });
}

export const createTable = async (table: CreateTableDTO, branchId: string) => {

    const newTable = await TableSchema.create({
        tableId: uuidv4(),
        branchId,
        number: table.number,
        customers: table.customers
    });

    return TableResponse.fromTable(newTable);
}

export const updateTable = async (id: string, table: UpdateTableDTO) => {
    const [affectedFields] = await TableSchema.update({
        number: table.number,
        customers: table.customers
    }, {
        where: {
            tableId: id
        }
    });

    return affectedFields;
}

export const deleteTable = async (id: string) => {
    return await TableSchema.destroy({
        where: {
            tableId: id
        }
    });
}
