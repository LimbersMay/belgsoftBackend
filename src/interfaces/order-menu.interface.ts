export interface OrderMenu {
    orderMenuId: string;
    menuId: string;
    orderId: string;
    quantity: number;
    price: number;
    createdAt?: Date;
    updatedAt?: Date;
}