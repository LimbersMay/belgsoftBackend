import {AbstractSpecification} from "./generic-specification";

export class AreaIdSpecification extends AbstractSpecification<string> {
    public readonly areaId: string;
    constructor(areaId: string) {
        super();
        this.areaId = areaId;
    }

    isSatisfiedBy(candidate: string): boolean {
        return candidate === this.areaId;
    }
}
