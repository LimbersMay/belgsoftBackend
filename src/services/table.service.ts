import {v4 as uuidv4} from 'uuid';
import {TableSchema} from "../models";
import {TableResponse} from "../mappers";
import {CreateTableDTO} from "../controllers";

export const getAllTables = async() => {
    const tables = await TableSchema.findAll({});
    return tables.map(table => TableResponse.fromTable(table));
}

export const createTable = async(table: CreateTableDTO) => {

}
