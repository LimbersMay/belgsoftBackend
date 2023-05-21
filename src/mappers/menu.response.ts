import {MenuSchema} from "../models";

interface MenuResponseProps {
    menuId: string;
    categoryId: string;
    category: string;
    name: string;
    description: string;
    price: number;
    image: string;
    isAvailable: boolean;
}

export class MenuResponse {
    private menuId: string;
    private categoryId: string;
    private category: string;
    private name: string;
    private description: string;
    private price: number;
    private image: string;
    private isAvailable: boolean;

    constructor({ menuId, categoryId, category, name, description, price, image, isAvailable }: MenuResponseProps) {
        this.menuId = menuId;
        this.categoryId = categoryId;
        this.category = category;
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
            category: menuModel.category.name,
            name: menuModel.name,
            description: menuModel.description,
            price: menuModel.price,
            image: menuModel.image,
            isAvailable: menuModel.isAvailable,
        });
    }

}
