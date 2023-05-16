import {MenuSchema} from "../models";

interface MenuResponseProps {
    menuId: string;
    categoryId: string;
    name: string;
    description: string;
    price: number;
    image: string;
    isAvailable: boolean;
}

export class MenuResponse {
    private menuId: string;
    private categoryId: string;
    private name: string;
    private description: string;
    private price: number;
    private image: string;
    private isAvailable: boolean;

    constructor({ menuId, categoryId, name, description, price, image, isAvailable }: MenuResponseProps) {
        this.menuId = menuId;
        this.categoryId = categoryId;
        this.name = name;
        this.description = description;
        this.price = price;
        this.image = image;
        this.isAvailable = isAvailable;
    }

    public static fromMenu(menuModel: MenuSchema) {
        return new MenuResponse({
            menuId: menuModel.menuId,
            categoryId: menuModel.categoryId,
            name: menuModel.name,
            description: menuModel.description,
            price: menuModel.price,
            image: menuModel.image,
            isAvailable: menuModel.isAvailable,
        });
    }

}
