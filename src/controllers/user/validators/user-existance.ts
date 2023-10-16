import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
} from 'class-validator';
import {findUser} from "../../../services";
import {Criteria} from "../../../specifications";
import {promiseHandler} from "../../helpers/promiseHandler";

@ValidatorConstraint({ async: true })
export class DoesUserExistWithQueryExistConstraint implements ValidatorConstraintInterface {
    async validate(field: string, args: ValidationArguments) {

        const specification = args.constraints[0](field);

        const user = await promiseHandler(
            findUser(specification)
        );

        return !!user.isOk();
    }
}

export function DoesUserWithQueryExist(
    specificationFactory: (propertyValue: string) => Criteria,
    validationOptions?: ValidationOptions
) {

    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [specificationFactory],
            validator: DoesUserExistWithQueryExistConstraint,
        });
    };
}

export function DoesUserWithQueryNotExist(
    specificationFactory: (propertyValue: string) => Criteria,
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
                    const doesExist = await new DoesUserExistWithQueryExistConstraint().validate(value, args);
                    return !doesExist;
                }
            }
        });
    };
}