import {AbstractSpecification} from "./generic-specification";

export class BranchIdSpecification extends AbstractSpecification<string> {
    public readonly branchId: string;

    public constructor(branchId: string) {
        super();
        this.branchId = branchId;
    }

    public isSatisfiedBy(candidate: string): boolean {
        return candidate === this.branchId;
    }
}
