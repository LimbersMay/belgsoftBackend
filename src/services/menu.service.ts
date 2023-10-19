import {v4 as uuidv4} from "uuid";
import {Err, Ok, Result} from "ts-results-es";
import {CategorySchema, MenuSchema} from "../models";
import {MenuResponse} from "../mappers";
import {CreateMenuDTO} from "../controllers/menu/validations/menu.create";
import {UpdateMenuDTO} from "../controllers/menu/validations/menu.update";
import {MenuError} from "../errors";
import {Criteria, SequelizeSpecificationBuilder} from "../specifications";
import {promiseHandler} from "../helpers";

const specificationBuilder = new SequelizeSpecificationBuilder();


export const findAllMenu = async (specifications: Criteria): Promise<Result<MenuResponse[], Error>> => {

    const whereClause = specificationBuilder.buildWhereClauseFromSpecifications(specifications);

    const menusResult = await promiseHandler(
        MenuSchema.findAll({
            where: whereClause,
            include: [
                {model: CategorySchema, as: 'category'}
            ]
        })
    );

    if (menusResult.isErr()) return menusResult.error;

    return Ok(
        menusResult.value.map(item => MenuResponse.fromMenu(item))
    );
}

export const findOneMenu = async (specifications: Criteria): Promise<Result<MenuResponse, MenuError.MENU_NOT_FOUND>> => {
    const whereClause = specificationBuilder.buildWhereClauseFromSpecifications(specifications);

    const menuResult = await promiseHandler(
        MenuSchema.findOne({
            where: whereClause,
            include: [
                {model: CategorySchema, as: 'category'}
            ]
        })
    );

    if (menuResult.isErr()) return Err(menuResult.error);

    if (!menuResult.value) return Err(MenuError.MENU_NOT_FOUND);

    return Ok(MenuResponse.fromMenu(menuResult.value));
}

export const createMenu = async (menuDTO: CreateMenuDTO, branchId: string): Promise<Result<MenuResponse, unknown>> => {

    const newMenu = await promiseHandler(
        MenuSchema.create({
            menuId: uuidv4(),
            branchId,
            categoryId: menuDTO.categoryId,
            name: menuDTO.name,
            description: menuDTO.description,
            price: menuDTO.price,
            image: menuDTO.image,
            isAvailable: menuDTO.isAvailable,
        })
    );

    if (newMenu.isErr()) return newMenu.error;

    await newMenu.value.reload({
        include: [
            {model: CategorySchema, as: 'category'}
        ]
    })

    return Ok(MenuResponse.fromMenu(newMenu.value));
}

export const updateMenu = async (menuDTO: UpdateMenuDTO, specifications: Criteria): Promise<Result<number, MenuError.MENU_NOT_UPDATED>> => {

    const whereClause = specificationBuilder.buildWhereClauseFromSpecifications(specifications);

    const updateResult = await promiseHandler(
        MenuSchema.update(
            {...menuDTO},
            {
                where: whereClause
            }
        )
    );

    if (updateResult.isErr()) return updateResult.error;

    if (updateResult.value[0] === 0) return Err(MenuError.MENU_NOT_UPDATED);

    return Ok(
        updateResult.value[0]
    );
}

export const deleteMenu = async (specifications: Criteria): Promise<Result<number, MenuError.MENU_NOT_DELETED>> => {

    const whereClause = specificationBuilder.buildWhereClauseFromSpecifications(specifications);

    const deleteResult = await promiseHandler(
        MenuSchema.destroy({
            where: whereClause
        })
    );

    if (deleteResult.isErr()) return deleteResult.error;

    if (deleteResult.value === 0) return Err(MenuError.MENU_NOT_DELETED);

    return Ok(
        deleteResult.value
    );
}
