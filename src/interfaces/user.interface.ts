export interface User {
    userId: string;
    createdByUserId?: string;
    branchId: string;
    name: string;
    email: string;
    roleId: string;
    userTypeId: string;
    userStateId: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}