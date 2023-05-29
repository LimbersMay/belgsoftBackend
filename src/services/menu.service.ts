import {v4 as uuidv4} from "uuid";
import {CategorySchema, MenuSchema} from "../models";
import {MenuResponse} from "../mappers";
import {CreateMenuDTO} from "../controllers/menu/validations/menu.create";
import {UpdateMenuDTO} from "../controllers/menu/validations/menu.update";
import {MenuSpecificationBuilder} from "../specifications/sequelize/menu-specification.builder";
import {Specification} from "../specifications";

type MenuSpecificationType = Specification<string> | Specification<string>[];
const menuSpecificationBuilder = new MenuSpecificationBuilder();

export const findAllMenu = async (specifications: MenuSpecificationType): Promise<MenuResponse[]> => {

    const whereClause = menuSpecificationBuilder.buildWhereClauseFromSpecifications(specifications);

    const menu = await MenuSchema.findAll({
        where: whereClause,
        include: [
            {model: CategorySchema, as: 'category'}
        ]
    });
    return menu.map(item => MenuResponse.fromMenu(item));
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
