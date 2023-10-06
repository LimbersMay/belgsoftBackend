import {v4 as uuidv4} from "uuid";
import {AreaSchema} from "../models";
import {CreateAreaDTO} from "../controllers/area/validations/area.create";
import {
    Criteria,
    SequelizeSpecificationBuilder,
} from "../specifications";
import {AreaResponse} from "../mappers";
import {UpdateAreaDTO} from "../controllers/area/validations/area.update";

const specificationBuilder = new SequelizeSpecificationBuilder();

export const findAllAreas = async (specifications: Criteria): Promise<AreaResponse[]> => {
    const whereQuery = specificationBuilder.buildWhereClauseFromSpecifications(specifications);

    const areas = await AreaSchema.findAll({where: whereQuery});
    return areas.map(area => AreaResponse.fromSchema(area))
}

export const findArea = async (specifications: Criteria): Promise<AreaResponse | null> => {
    const whereQuery = specificationBuilder.buildWhereClauseFromSpecifications(specifications);
    return await AreaSchema.findOne({where: whereQuery});
}

export const createArea = async (createAreaDTO: CreateAreaDTO, branchId: string): Promise<AreaResponse> => {
    const newArea = await AreaSchema.create({
        areaId: uuidv4(),
        branchId,
        name: createAreaDTO.name,
        description: createAreaDTO.description,
    });

    return AreaResponse.fromSchema(newArea);
}

export const updateArea = async (updateAreaDTO: UpdateAreaDTO, specifications: Criteria): Promise<number> => {
    const whereQuery = specificationBuilder.buildWhereClauseFromSpecifications(specifications);

    const [ affectedFields ] = await AreaSchema.update(updateAreaDTO, { where: whereQuery });

    return affectedFields;
}

export const deleteArea = async (specifications: Criteria): Promise<number> => {
    const whereQuery = specificationBuilder.buildWhereClauseFromSpecifications(specifications);

    return await AreaSchema.destroy({where: whereQuery});
}
