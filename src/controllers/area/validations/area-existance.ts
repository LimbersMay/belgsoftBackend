import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import {findArea} from "../../../services";
import {Criteria} from "../../../specifications";

@ValidatorConstraint({async: true})
export class IsAreaExistConstraint implements ValidatorConstraintInterface {
    async validate(tableId: string, args: ValidationArguments) {

        const specifications = args.constraints[0](tableId) as Criteria;

        const table = await findArea(specifications);
        return !!table;
    }
}

export function IsAreaExists(
    specificationsFactory: (propertyValue: any) => Criteria,
    validationOptions?: ValidationOptions
) {

    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [specificationsFactory],
            validator: IsAreaExistConstraint,
        });
    };
}

export function IsAreaDoesNotExist(specifications: Criteria, validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [specifications],
            validator: {
                async validate(value: string, args: ValidationArguments) {
                    const isExist = await new IsAreaExistConstraint().validate(value, args);
                    return !isExist;
                }
            }
        });
    };
}