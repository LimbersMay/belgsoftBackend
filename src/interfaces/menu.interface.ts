export interface Menu {
    menuId: string;
    branchId: string;
    categoryId: string;
    name: string;
    description: string;
    price: number;
    image: string;
    isAvailable: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}