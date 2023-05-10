import {Socket} from "socket.io";
import {OrderRequest} from "../../interfaces/order-request.interface";

export class OrderSocketController {
    private clients: Map<string, Set<string>> = new Map();
    public onConnection(socket: Socket) {

        // when the client creates a new order
        socket.on("new-order", (order: OrderRequest) => {

            // we send the event to all the users

        });

        // when the client authenticates
        socket.on("authenticate", (userId: string) => {

            // if the client has not been registered yet
            if (!this.clients.has(userId)) {
                this.clients.set(userId, new Set())
            }

            // everytime a client connects we verify if is the same client
            // and if it is we add join the client at the same room
            const roomId = userId;
            this.clients.get(userId)?.add(roomId);

            socket.join(roomId);
        });
    }
}
