import {AbstractSpecification, Expression} from "./generic-specification";
import {Category} from "../interfaces";

export class CategoryIdSpecification extends AbstractSpecification<Category> {
    public readonly categoryId: string;

    public constructor(categoryId: string) {
        super();
        this.categoryId = categoryId;
    }

    public isSatisfiedBy(candidate: Category): boolean {
        return candidate.categoryId === this.categoryId;
    }

    public convertToExpression(): Expression<Category> {
        return { categoryId: this.categoryId };
    }
}