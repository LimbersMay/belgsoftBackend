import {AbstractSpecification, Expression} from "./generic-specification";
import {Area} from "../interfaces";

export class AreaIdSpecification extends AbstractSpecification<Area> {
    public readonly areaId: string;
    constructor(areaId: string) {
        super();
        this.areaId = areaId;
    }

    isSatisfiedBy(candidate: Area): boolean {
        return candidate.areaId === this.areaId;
    }

    convertToExpression(): Expression<Area> {
        return {areaId: this.areaId};
    }
}
