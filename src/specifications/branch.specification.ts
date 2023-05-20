import {AbstractSpecification} from "./generic-specification";
import {Branch} from "../interfaces/branch.interface";

export class BranchIdSpecification extends AbstractSpecification<Branch> {
    public readonly branchId: string;

    public constructor(branchId: string) {
        super();
        this.branchId = branchId;
    }

    public isSatisfiedBy(candidate: Branch): boolean {
        return candidate.branchId === this.branchId;
    }
}