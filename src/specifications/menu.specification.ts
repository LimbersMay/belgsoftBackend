import {AbstractSpecification} from "./generic-specification";

export class MenuIdSpecification extends AbstractSpecification<string> {

    public readonly menuId: string;

    constructor(menuId: string) {
        super();
        this.menuId = menuId;
    }

    isSatisfiedBy(candidate: string): boolean {
        return candidate === this.menuId;
    }
}
