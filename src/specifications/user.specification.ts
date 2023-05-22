import {AbstractSpecification} from "./generic-specification";

export class UserIdSpecification extends AbstractSpecification<string> {
    public readonly userId: string;

    public constructor(userId: string) {
        super();
        this.userId = userId;
    }

    public isSatisfiedBy(candidate: string): boolean {
        return candidate === this.userId;
    }
}

export class UserEmailSpecification extends AbstractSpecification<string> {
    public readonly email: string;

    public constructor(email: string) {
        super();
        this.email = email;
    }

    public isSatisfiedBy(candidate: string): boolean {
        return candidate === this.email;
    }
}

export class CreatedByAdminIdSpecification extends AbstractSpecification<string> {
    public readonly adminId: string;

    public constructor(adminId: string) {
        super();
        this.adminId = adminId;
    }

    public isSatisfiedBy(candidate: string): boolean {
        return candidate === this.adminId;
    }
}
