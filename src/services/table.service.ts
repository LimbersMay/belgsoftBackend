import {v4 as uuidv4} from 'uuid';
import {TableSchema} from "../models";
import {TableResponse} from "../mappers";
import {CreateTableDTO} from "../controllers";
import {UpdateTableDTO} from "../controllers/table/validators/table.update";
import {Criteria, SequelizeSpecificationBuilder} from "../specifications";

const specificationBuilder = new SequelizeSpecificationBuilder();

export const findAllTables = async (specifications: Criteria) => {

    const whereClause = specificationBuilder.buildWhereClauseFromSpecifications(specifications);

    const tables = await TableSchema.findAll({
        where: whereClause
    });

    return tables.map(table => TableResponse.fromTable(table));
}

export const findTableByQuery = async (specifications: Criteria) => {

    const whereClause = specificationBuilder.buildWhereClauseFromSpecifications(specifications);

    return await TableSchema.findOne({
        where: whereClause
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

export const updateTable = async (tableDTO: UpdateTableDTO, specifications: Criteria) => {

    const whereClause = specificationBuilder.buildWhereClauseFromSpecifications(specifications);

    const [affectedFields] = await TableSchema.update({
        number: tableDTO.number,
        customers: tableDTO.customers
    }, {
        where: whereClause
    });

    return affectedFields;
}

export const deleteTable = async (specifications: Criteria) => {

    const whereClause = specificationBuilder.buildWhereClauseFromSpecifications(specifications);

    return await TableSchema.destroy({
        where: whereClause
    });
}
