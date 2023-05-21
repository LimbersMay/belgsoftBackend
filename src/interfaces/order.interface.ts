
export interface Order {
    orderId: string;
    branchId: string;
    menuId: string;
    customerName?: string;
    areaId: string;
    tableId: string;
    userId: string;
    orderStatusId: string;
    price: number;
    quantity: number;
    createdAt?: Date;
    updatedAt?: Date;
}
