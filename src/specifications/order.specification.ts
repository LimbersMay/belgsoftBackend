import {AbstractSpecification} from "./generic-specification";

export class OrderIdSpecification extends AbstractSpecification<string> {

    public readonly orderId: string;

    constructor(orderId: string) {
        super();
        this.orderId = orderId;
    }

    isSatisfiedBy(candidate: string): boolean {
        return candidate === this.orderId;
    }
}
