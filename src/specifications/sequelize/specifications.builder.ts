import {Op, WhereOptions} from "sequelize";
import {SpecificationBuilder} from "../specification-builder";
import {
    AbstractSpecification,
    AndSpecification,
    Criteria,
    NotSpecification,
    OrSpecification
} from "../generic-specification";

export class SequelizeSpecificationBuilder implements SpecificationBuilder<WhereOptions>{

    public buildWhereClauseFromSpecifications(specifications: Criteria): WhereOptions<Criteria> {
        const where: WhereOptions = {};

        // if we get a single specification, convert it to an array
        const specs = Array.isArray(specifications) ? specifications : [specifications];

        for (const specification of specs) {
            const clause = this.buildWhereClauseFromSpecification(specification);
            Object.assign(where, clause);
        }

        return where;
    }

    public buildComplexSpecification(specification: AbstractSpecification<unknown>): WhereOptions<Criteria> {
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

    public buildWhereClauseFromSpecification(specification: AbstractSpecification<unknown>): WhereOptions<Criteria> {

        if (!(specification instanceof AndSpecification || specification instanceof OrSpecification || specification instanceof NotSpecification)) {
            return specification.convertToExpression() as WhereOptions<Criteria>;
        }

        return this.buildComplexSpecification(specification);
    };
}
