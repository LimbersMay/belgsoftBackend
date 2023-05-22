import {Op, WhereOptions} from "sequelize";
import {AndSpecification, NotSpecification, OrSpecification, Specification} from "../generic-specification";

export abstract class AbstractSpecificationBuilder {

    public buildWhereClauseFromSpecifications<T>(specifications: T) {
        const where: WhereOptions = {};

        // if we get a single specification, convert it to an array
        const specs = Array.isArray(specifications) ? specifications : [specifications];

        for (const specification of specs) {
            const clause = this.buildWhereClauseFromSpecification(specification);
            Object.assign(where, clause);
        }

        return where;
    }

    public buildComplexSpecification <T>(specification: Specification<T>): WhereOptions<T> {
        // If you have complex specifications, you can use the following
        if (specification instanceof AndSpecification) {
            const oneClause = this.buildWhereClauseFromSpecification(specification.one);
            const otherClause = this.buildWhereClauseFromSpecification(specification.other);
            return { [Op.and]: [oneClause, otherClause] };
        } else if (specification instanceof OrSpecification) {
            const oneClause = this.buildWhereClauseFromSpecification(specification.one);
            const otherClause = this.buildWhereClauseFromSpecification(specification.other);
            return { [Op.or]: [oneClause, otherClause] };
        } else if (specification instanceof NotSpecification) {
            const wrappedClause = this.buildWhereClauseFromSpecification(specification.wrapped);
            return { [Op.not]: wrappedClause };
        }

        // if specification is not recognized, return empty where clause
        return {};
    }

    public abstract buildWhereClauseFromSpecification <T>(specification: Specification<T>): WhereOptions<T>;
}
