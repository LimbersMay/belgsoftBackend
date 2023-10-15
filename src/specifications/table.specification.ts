import {AbstractSpecification, Expression} from "./generic-specification";
import {Table} from "../interfaces";

export class TableIdSpecification extends AbstractSpecification<Table> {

    public readonly tableId: string;

    constructor(tableId: string) {
        super();
        this.tableId = tableId;
    }

    isSatisfiedBy(candidate: Table): boolean {
        return candidate.tableId === this.tableId;
    }

    convertToExpression(): Expression<Table> {
        return { tableId: this.tableId };
    }
}

export class TableNumberSpecification extends AbstractSpecification<Table> {

        public readonly number: string;

        constructor(number: string) {
            super();
            this.number = number;
        }

        isSatisfiedBy(candidate: Table): boolean {
            return candidate.number === this.number;
        }

        convertToExpression(): Expression<Table> {
            return { number: this.number };
        }
}
