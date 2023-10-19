import {v4 as uuidv4} from "uuid";
import {Err, Ok, Result} from "ts-results-es";
import {AreaSchema} from "../models";
import {CreateAreaDTO} from "../controllers/area/validations/area.create";
import {
    Criteria,
    SequelizeSpecificationBuilder,
} from "../specifications";
import {AreaResponse} from "../mappers";
import {UpdateAreaDTO} from "../controllers/area/validations/area.update";
import {AreaError} from "../errors/area.error";
import {promiseHandler} from "../helpers/promiseHandler";

const specificationBuilder = new SequelizeSpecificationBuilder();

export const findAllAreas = async (specifications: Criteria): Promise<Result<AreaResponse[], Error>> => {
    const whereQuery = specificationBuilder.buildWhereClauseFromSpecifications(specifications);

    const areas = await promiseHandler(
        AreaSchema.findAll({where: whereQuery})
    );

    // Unhandled error occurred
    if (areas.isErr()) return Err(areas.error);

    return Ok(
        areas.value.map(area => AreaResponse.fromSchema(area))
    );
}

export const findArea = async (specifications: Criteria): Promise<Result<AreaSchema, AreaError.AREA_NOT_FOUND>> => {
    const whereQuery = specificationBuilder.buildWhereClauseFromSpecifications(specifications);

    const result = await promiseHandler(
        AreaSchema.findOne({where: whereQuery})
    );

    // Unhandled error occurred
    if (result.isErr()) return Err(result.error);

    if (!result.value) return Err(AreaError.AREA_NOT_FOUND);

    return Ok(result.value);
}

export const createArea = async (createAreaDTO: CreateAreaDTO, branchId: string): Promise<Result<AreaResponse, unknown>> => {

    const result = await promiseHandler(
        AreaSchema.create({
            areaId: uuidv4(),
            branchId,
            name: createAreaDTO.name,
            description: createAreaDTO.description,
        })
    );

    // If an unhandled error occurred, return an error
    if (result.isErr()) return Err(result.error);

    return Ok(
        AreaResponse.fromSchema(result.value)
    );
}

export const updateArea = async (updateAreaDTO: UpdateAreaDTO, specifications: Criteria): Promise<Result<number, AreaError.AREA_NOT_UPDATED>> => {
    const whereQuery = specificationBuilder.buildWhereClauseFromSpecifications(specifications);

    const result = await promiseHandler(
        AreaSchema.update(updateAreaDTO, { where: whereQuery })
    );

    // Unhandled error occurred
    if (result.isErr()) return Err(result.error);

    // Known error occurred (area not found)
    if (result.value[0] === 0) return Err(AreaError.AREA_NOT_UPDATED);

    return Ok(result.value[0]);
}

export const deleteArea = async (specifications: Criteria): Promise<Result<number, AreaError.AREA_NOT_DELETED>> => {
    const whereQuery = specificationBuilder.buildWhereClauseFromSpecifications(specifications);

    const result = await promiseHandler(
        AreaSchema.destroy({where: whereQuery})
    );

    // Unhandled error occurred
    if (result.isErr()) return Err(result.error);

    // Known error occurred (area not found)
    if (result.value === 0) return Err(AreaError.AREA_NOT_DELETED);

    return Ok(result.value);
}
