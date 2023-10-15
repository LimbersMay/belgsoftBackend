export type Expression<T> = {
    [key in keyof T]?: T[key] | Expression<T> | Expression<T>[];
};

export type Criteria = AbstractSpecification<unknown> | AbstractSpecification<unknown>[];

export abstract class AbstractSpecification<T> {

    abstract isSatisfiedBy(candidate: T): boolean;

    public and(other: AbstractSpecification<T>): AbstractSpecification<T> {
        return new AndSpecification(this, other);
    }

    public or(other: AbstractSpecification<T>): AbstractSpecification<T> {
        return new OrSpecification(this, other);
    }

    public not(): AbstractSpecification<T> {
        return new NotSpecification(this);
    }

    public abstract convertToExpression(): Expression<T>;
}

export class AndSpecification<T> extends AbstractSpecification<T> {
    public one: AbstractSpecification<T>;
    public other: AbstractSpecification<T>;

    public constructor(one: AbstractSpecification<T>, other: AbstractSpecification<T>) {
        super();
        this.one = one;
        this.other = other;
    }

    public isSatisfiedBy(candidate: T): boolean {
        return this.one.isSatisfiedBy(candidate) && this.other.isSatisfiedBy(candidate);
    }

    convertToExpression(): Expression<any> {
        const oneExpression = this.one.convertToExpression();
        const otherExpression = this.other.convertToExpression();
        return [
            oneExpression,
            otherExpression,
        ];
    }
}

export class OrSpecification<T> extends AbstractSpecification<T> {
    public one: AbstractSpecification<T>;
    public other: AbstractSpecification<T>;

    public constructor(one: AbstractSpecification<T>, other: AbstractSpecification<T>) {
        super();
        this.one = one;
        this.other = other;
    }

    public isSatisfiedBy(candidate: T): boolean {
        return this.one.isSatisfiedBy(candidate) || this.other.isSatisfiedBy(candidate);
    }

    convertToExpression(): Expression<any> {
        const oneExpression = this.one.convertToExpression();
        const otherExpression = this.other.convertToExpression();
        return [
            oneExpression,
            otherExpression,
        ];
    }
}

export class NotSpecification<T> extends AbstractSpecification<T> {

    public wrapped: AbstractSpecification<T>;

    public constructor(wrapped: AbstractSpecification<T>) {
        super();
        this.wrapped = wrapped;
    }

    public isSatisfiedBy(candidate: T): boolean {
        return !this.wrapped.isSatisfiedBy(candidate);
    }

    public convertToExpression(): Expression<any> {
        const wrappedExpression = this.wrapped.convertToExpression();
        return [wrappedExpression];
    }
}
