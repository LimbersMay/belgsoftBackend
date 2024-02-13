import {v4 as uuidv4} from 'uuid';
import {TableSchema} from "../models";
import {TableResponse} from "../mappers";
import {CreateTableDTO} from "../controllers";
import {UpdateTableDTO} from "../controllers/table/validators/table.update";
import {Criteria, SequelizeSpecificationBuilder} from "../specifications";
import sequelize from "../models/init";
import {promiseHandler} from "../helpers";

const specificationBuilder = new SequelizeSpecificationBuilder();

export const findAllTables = async (specifications: Criteria) => {

    const whereClause = specificationBuilder.buildWhereClauseFromSpecifications(specifications);

    const tables = await TableSchema.findAll({
        where: whereClause
    });

    return tables.map(table => TableResponse.fromTable(table));
}

export const findOneTable = async (specifications: Criteria) => {

    const whereClause = specificationBuilder.buildWhereClauseFromSpecifications(specifications);

    return await TableSchema.findOne({
        where: whereClause
    });
}

export const createTable = async (table: CreateTableDTO, branchId: string) => {

    // Call the stored procedure
    const response = await sequelize.query(`CALL spCreateTable(:tableIdParam, :branchIdParam, :numberParam, :customersParam);`, {
        replacements: {
            tableIdParam: uuidv4(),
            branchIdParam: branchId,
            numberParam: table.number,
            customersParam: table.customers
        }
    });

    // Structure the response
    const result = response[0] as any;
    return result.tableId;
}

export const updateTable = async (tableDTO: UpdateTableDTO, tableId: string, branchId: string) => {

    const result = await promiseHandler(
        TableSchema.update({
            number: tableDTO.number,
            customers: tableDTO.customers
        }, {
            where: {
                tableId,
                branchId
            }
        })
    );

    if (result.isErr()) return result.error;

    return result.value;
}

export const deleteTable = async (specifications: Criteria) => {

    const whereClause = specificationBuilder.buildWhereClauseFromSpecifications(specifications);

    return await TableSchema.destroy({
        where: whereClause
    });
}
