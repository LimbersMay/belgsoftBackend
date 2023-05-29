import {AbstractSpecification} from "./generic-specification";

export class CategoryIdSpecification extends AbstractSpecification<string> {
    public readonly categoryId: string;

    public constructor(categoryId: string) {
        super();
        this.categoryId = categoryId;
    }

    public isSatisfiedBy(candidate: string): boolean {
        return candidate === this.categoryId;
    }
}