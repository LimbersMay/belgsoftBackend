import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
} from 'class-validator';
import {findUser} from "../../services";
import {UserEmailSpecification} from "../../specifications";

@ValidatorConstraint({ async: true })
export class IsUserAlreadyExistConstraint implements ValidatorConstraintInterface {
    async validate(email: string, args: ValidationArguments) {
        const user = await findUser(new UserEmailSpecification(email));
        return !user;
    }
}

export function IsUserAlreadyExist(validationOptions?: ValidationOptions) {

    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsUserAlreadyExistConstraint,
        });
    };
}