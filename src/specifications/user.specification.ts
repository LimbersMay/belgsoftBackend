import {AbstractSpecification, Expression} from "./generic-specification";
import {User} from "../interfaces";

export class UserIdSpecification extends AbstractSpecification<User> {
    public readonly userId: string;

    public constructor(userId: string) {
        super();
        this.userId = userId;
    }

    public isSatisfiedBy(candidate: User): boolean {
        return candidate.userId === this.userId;
    }

    convertToExpression(): Expression<User> {
        return { userId: this.userId };
    }
}

export class UserEmailSpecification extends AbstractSpecification<User> {
    public readonly email: string;

    public constructor(email: string) {
        super();
        this.email = email;
    }

    public isSatisfiedBy(candidate: User): boolean {
        return candidate.email === this.email;
    }

    convertToExpression(): Expression<User> {
        return { email: this.email };
    }
}

export class CreatedByAdminIdSpecification extends AbstractSpecification<User> {
    public readonly adminId: string;

    public constructor(adminId: string) {
        super();
        this.adminId = adminId;
    }

    public isSatisfiedBy(candidate: User): boolean {
        return candidate.createdByUserId === this.adminId;
    }

    convertToExpression(): Expression<User> {
        return { createdByUserId: this.adminId };
    }
}
