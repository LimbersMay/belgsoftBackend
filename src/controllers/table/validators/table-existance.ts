import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
} from 'class-validator';
import {findTableByQuery} from "../../../services";

@ValidatorConstraint({ async: true })
export class IsTableExistConstraint implements ValidatorConstraintInterface {
    async validate(value: string, args: ValidationArguments) {

        const fieldName = args.property;
        let query: Record<string, string> = {}

        if (fieldName === 'id') {
            query = {
                tableId: value
            }
        } else {
            query[fieldName] = value;
        }

        const table = await findTableByQuery(query);

        return !!table;
    }
}

export function IsTableExist(validationOptions?: ValidationOptions) {

    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsTableExistConstraint,
        });
    };
}

export function IsTableDoesNotExist(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: {
                async validate(value: string, args: ValidationArguments) {
                    const isExist = await new IsTableExistConstraint().validate(value, args);
                    return !isExist;
                }
            }
        });
    };
}
