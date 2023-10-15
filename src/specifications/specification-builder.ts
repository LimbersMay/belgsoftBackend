import {AbstractSpecification, Criteria} from "./generic-specification";

/*
    1. The SpecificationBuilder interface defines the contract for the builder.

    The T generic parameter is the type of the object that the builder returns, for example, a WhereOptions<T> in
    Sequelize or a Criteria in TypeORM.

    The purpose of receiving specifications with unknown types is to avoid coupling the builder to the specification
    types. This way, the builder can be reused with different specifications making possible to combine
    specifications from different domains.

    2. However, there is a problem with that flexibility. The builder doesn’t know the specification types, so it is
    possible to combine specifications that don't make sense. For example, if we combine the specifications:

    UserEmailSpecification and TableIdSpecification, the builder will create a query that filters by email and tableId
    in the User table. This is not a valid query, because the User table doesn’t have a tableId column.
 */

export interface SpecificationBuilder<T> {
    buildWhereClauseFromSpecifications(specifications: Criteria): T;
    buildComplexSpecification(specification: AbstractSpecification<unknown>): T;
    buildWhereClauseFromSpecification(specification: AbstractSpecification<unknown>): T;
}