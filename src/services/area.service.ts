import {v4 as uuidv4} from "uuid";
import {AreaSchema} from "../models";
import {CreateAreaDTO} from "../controllers/area/validations/area.create";
import {
    Specification
} from "../specifications";
import {AreaSpecificationsBuilder} from "../specifications/sequelize";
import {AreaResponse} from "../mappers/area.response";

type AreaSpecification = Specification<string> | Specification<string>[];

const areaSpecificationsBuilder = new AreaSpecificationsBuilder();

export const findAllAreas = async (specifications: AreaSpecification) => {
    const whereQuery = areaSpecificationsBuilder.buildWhereClauseFromSpecifications(specifications);

    const areas = await AreaSchema.findAll({where: whereQuery});
    return areas.map(area => AreaResponse.fromSchema(area))
}

export const createArea = async (createAreaDTO: CreateAreaDTO, branchId: string) => {
    const newArea = await AreaSchema.create({
        areaId: uuidv4(),
        branchId,
        name: createAreaDTO.name,
        description: createAreaDTO.description,
    });

    await newArea.reload();

    return newArea;
}
