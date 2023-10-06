import {AbstractSpecification, Expression} from "./generic-specification";
import {Menu} from "../interfaces";

export class MenuIdSpecification extends AbstractSpecification<Menu> {

    public readonly menuId: string;

    constructor(menuId: string) {
        super();
        this.menuId = menuId;
    }

    isSatisfiedBy(candidate: Menu): boolean {
        return candidate.menuId === this.menuId;
    }

    convertToExpression(): Expression<Menu> {
        return { menuId: this.menuId };
    }
}
