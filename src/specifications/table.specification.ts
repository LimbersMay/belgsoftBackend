import {AbstractSpecification} from "./generic-specification";

export class TableIdSpecification extends AbstractSpecification<string> {

    public readonly tableId: string;

    constructor(tableId: string) {
        super();
        this.tableId = tableId;
    }

    isSatisfiedBy(candidate: string): boolean {
        return candidate === this.tableId;
    }
}