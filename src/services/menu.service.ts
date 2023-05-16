import {MenuSchema} from "../models";
import {MenuResponse} from "../mappers/menu.response";

export const findAllMenu = async (): Promise<MenuResponse[]> => {
    const menu = await MenuSchema.findAll({});
    return menu.map(item => MenuResponse.fromMenu(item));
}
