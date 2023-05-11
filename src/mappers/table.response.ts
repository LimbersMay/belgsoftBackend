import {TableSchema} from "../models";

interface TableResponseProps {
    tableId: string;
    number: string;
    customers: number;
    createdAt: Date;
    updatedAt: Date;
}

export class TableResponse {
    private tableId: string;
    private number: string;
    private customers: number;
    private createdAt: Date;
    private updatedAt: Date;

    constructor({ tableId, number, customers, createdAt, updatedAt }: TableResponseProps) {
        this.tableId = tableId;
        this.number = number;
        this.customers = customers;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static fromTable(tableModel: TableSchema) {
        return new TableResponse({
            tableId: tableModel.tableId,
            number: tableModel.number,
            customers: tableModel.customers,
            createdAt: tableModel.createdAt,
            updatedAt: tableModel.updatedAt
        });
    }

}
