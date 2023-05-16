export interface Menu {
    menuId: string;
    categoryId: string;
    name: string;
    description: string;
    price: number;
    image: string;
    isAvailable: boolean;
    createdAt: Date;
    updatedAt: Date;
}