import {v4 as uuidv4} from "uuid";
import {AreaSchema} from "../models";
import {CreateAreaDTO} from "../controllers/area/validations/area.create";
import {
    Specification
} from "../specifications";
import {AreaSpecificationsBuilder} from "../specifications/sequelize";

type AreaSpecification = Specification<string> | Specification<string>[];

const areaSpecificationsBuilder = new AreaSpecificationsBuilder();

export const findAllArea = async (specifications: AreaSpecification) => {
    const whereQuery = areaSpecificationsBuilder.buildWhereClauseFromSpecifications(specifications);

    return await AreaSchema.findAll({
        where: whereQuery
    });
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
