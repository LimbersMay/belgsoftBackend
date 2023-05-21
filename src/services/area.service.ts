import {v4 as uuidv4} from "uuid";
import {AreaSchema} from "../models";
import {CreateAreaDTO} from "../controllers/area/validations/area.create";
import {
    Specification
} from "../specifications";
import {AreaSpecificationsBuilder} from "../specifications/sequelize";
import {AreaResponse} from "../mappers";
import {UpdateAreaDTO} from "../controllers/area/validations/area.update";

type AreaSpecification = Specification<string> | Specification<string>[];

const areaSpecificationsBuilder = new AreaSpecificationsBuilder();

export const findAllAreas = async (specifications: AreaSpecification) => {
    const whereQuery = areaSpecificationsBuilder.buildWhereClauseFromSpecifications(specifications);

    const areas = await AreaSchema.findAll({where: whereQuery});
    return areas.map(area => AreaResponse.fromSchema(area))
}

export const findArea = async (specifications: AreaSpecification) => {
    const whereQuery = areaSpecificationsBuilder.buildWhereClauseFromSpecifications(specifications);
    return await AreaSchema.findOne({where: whereQuery});
}

export const createArea = async (createAreaDTO: CreateAreaDTO, branchId: string) => {
    const newArea = await AreaSchema.create({
        areaId: uuidv4(),
        branchId,
        name: createAreaDTO.name,
        description: createAreaDTO.description,
    });

    return AreaResponse.fromSchema(newArea);
}

export const updateArea = async (updateAreaDTO: UpdateAreaDTO,specifications: AreaSpecification) => {
    const whereQuery = areaSpecificationsBuilder.buildWhereClauseFromSpecifications(specifications);

    const [ affectedFields ] = await AreaSchema.update(updateAreaDTO, { where: whereQuery });

    return affectedFields;
}

export const deleteArea = async (specifications: AreaSpecification) => {
    const whereQuery = areaSpecificationsBuilder.buildWhereClauseFromSpecifications(specifications);

    return await AreaSchema.destroy({where: whereQuery});
}
