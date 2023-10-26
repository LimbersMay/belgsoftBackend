import {AbstractSpecification} from "./generic-specification";

export interface SpecificationBuilder<T, K> {
    buildWhereClauseFromSpecifications(specifications: AbstractSpecification<T> | AbstractSpecification<T>[]): K;
    buildComplexSpecification(specification: AbstractSpecification<T>): K;
    buildWhereClauseFromSpecification(specification: AbstractSpecification<T>): K;
}