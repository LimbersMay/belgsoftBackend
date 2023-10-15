import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
} from 'class-validator';
import {findOneTable} from "../../../services";
import {Criteria} from "../../../specifications";

@ValidatorConstraint({async: true})
export class DoesTableExistConstraint implements ValidatorConstraintInterface {
    async validate(value: string, args: ValidationArguments) {

        /*
            args.constraints[0] is a function that returns another function, which is a specification

              Example:
                  @DoesTableWithQueryExist((value: string) => new TableNumberSpecification(value))
                  number!: string;

                  args.constraints[0] is (value: string) => new TableNumberSpecification(value)
                  args.constraints[0](value) is new TableNumberSpecification(value)

             However, the value is what is passed to the validator, so it is the table number
         */

        const specification = args.constraints[0](value);
        const table = await findOneTable(specification);
        return !!table;
    }
}

export function DoesTableWithQueryExist(
    specificationFactory: (value: string) => Criteria,
    validationOptions?: ValidationOptions
) {

    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [specificationFactory],
            validator: DoesTableExistConstraint,
        });
    };
}

export function DoesTableWithQueryDoesNotExist(
    specificationFactory: (value: string) => Criteria,
    validationOptions?: ValidationOptions
) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [specificationFactory],
            validator: {
                async validate(value: string, args: ValidationArguments) {
                    const isExist = await new DoesTableExistConstraint().validate(value, args);
                    return !isExist;
                }
            }
        });
    };
}
