export interface Specification<T> {
    isSatisfiedBy(candidate: T): boolean;
    and(other: Specification<T>): Specification<T>;
    or(other: Specification<T>): Specification<T>;
    not(): Specification<T>;
}

export abstract class AbstractSpecification<T> implements Specification<T> {
    abstract isSatisfiedBy(candidate: T): boolean;

    and(other: Specification<T>): Specification<T> {
        return new AndSpecification(this, other);
    }

    or(other: Specification<T>): Specification<T> {
        return new OrSpecification(this, other);
    }

    not(): Specification<T> {
        return new NotSpecification(this);
    }
}

export class AndSpecification<T> extends AbstractSpecification<T> {
    public one: Specification<T>;
    public other: Specification<T>;

    public constructor(one: Specification<T>, other: Specification<T>) {
        super();
        this.one = one;
        this.other = other;
    }

    public isSatisfiedBy(candidate: T): boolean {
        return this.one.isSatisfiedBy(candidate) && this.other.isSatisfiedBy(candidate);
    }
}

export class OrSpecification<T> extends AbstractSpecification<T> {
    public one: Specification<T>;
    public other: Specification<T>;

    public constructor(one: Specification<T>, other: Specification<T>) {
        super();
        this.one = one;
        this.other = other;
    }

    public isSatisfiedBy(candidate: T): boolean {
        return this.one.isSatisfiedBy(candidate) || this.other.isSatisfiedBy(candidate);
    }
}

export class NotSpecification<T> extends AbstractSpecification<T> {
    public wrapped: Specification<T>;

    public constructor(wrapped: Specification<T>) {
        super();
        this.wrapped = wrapped;
    }

    public isSatisfiedBy(candidate: T): boolean {
        return !this.wrapped.isSatisfiedBy(candidate);
    }
}
