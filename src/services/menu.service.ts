import {v4 as uuidv4} from "uuid";
import {CategorySchema, MenuSchema} from "../models";
import {MenuResponse} from "../mappers";
import {CreateMenuDTO} from "../controllers/menu/validations/menu.create";
import {UpdateMenuDTO} from "../controllers/menu/validations/menu.update";
import {MenuErrors} from "../errors";
import {Criteria, SequelizeSpecificationBuilder} from "../specifications";

const specificationBuilder = new SequelizeSpecificationBuilder();

export const findAllMenu = async (specifications: Criteria): Promise<MenuResponse[]> => {

    const whereClause = specificationBuilder.buildWhereClauseFromSpecifications(specifications);

    const menu = await MenuSchema.findAll({
        where: whereClause,
        include: [
            {model: CategorySchema, as: 'category'}
        ]
    });
    return menu.map(item => MenuResponse.fromMenu(item));
}

export const findOneMenu = async (specifications: Criteria) => {
    const whereClause = specificationBuilder.buildWhereClauseFromSpecifications(specifications);

    const menu = await MenuSchema.findOne({
        where: whereClause,
        include: [
            {model: CategorySchema, as: 'category'}
        ]
    });

    if (!menu){
        return MenuErrors.MENU_NOT_FOUND
    }

    return MenuResponse.fromMenu(menu);
}

export const createMenu = async (menuDTO: CreateMenuDTO, branchId: string) => {
    const newMenu = await MenuSchema.create({
        menuId: uuidv4(),
        branchId,
        categoryId: menuDTO.categoryId,
        name: menuDTO.name,
        description: menuDTO.description,
        price: menuDTO.price,
        image: menuDTO.image,
        isAvailable: menuDTO.isAvailable,
    });

    await newMenu.reload({
        include: [
            {model: CategorySchema, as: 'category'}
        ]
    })

    return MenuResponse.fromMenu(newMenu);
}

export const updateMenu = async (menuId: string, branchId: string, menuDTO: UpdateMenuDTO) => {
    const [ affectedFields ] = await MenuSchema.update(
        {...menuDTO},
        {
            where: {
                menuId,
                branchId
            }
        }
    );

    return affectedFields;
}

export const deleteMenu = async (menuId: string, branchId: string) => {
    return await MenuSchema.destroy({
        where: {
            menuId,
            branchId
        }
    });
}
