import {AbstractSpecification, Expression} from "./generic-specification";
import {Order} from "../interfaces";

export class OrderIdSpecification extends AbstractSpecification<Order> {

    public readonly orderId: string;

    constructor(orderId: string) {
        super();
        this.orderId = orderId;
    }

    isSatisfiedBy(candidate: Order): boolean {
        return candidate.orderId === this.orderId;
    }

    convertToExpression(): Expression<Order> {
        return { orderId: this.orderId };
    }
}
