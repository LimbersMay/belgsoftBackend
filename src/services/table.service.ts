import {TableSchema} from "../models";
import {TableResponse} from "../mappers/table.response";

export const getAllTables = async() => {
    const tables = await TableSchema.findAll({});
    return tables.map(table => TableResponse.fromTable(table));
}
