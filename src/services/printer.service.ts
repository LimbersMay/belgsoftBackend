import net from "net";
import {PrintOrderDTO} from "../controllers/order/validators/order.print";
import EscPosEncoder from "esc-pos-encoder";

export class PrinterService {

    private static socket: net.Socket;

    public static connect(host: string, port: number) {

        PrinterService.socket = new net.Socket();

        PrinterService.socket.on('connect', () => {
            console.log("Connected to the thermal printer")
        })

        PrinterService.socket.on("end", () => {
            console.log("Disconnected from the thermal printer")
        })

        PrinterService.socket.on("error", (error) => {
            console.log("Error in the connection", error);
        });

        PrinterService.socket.connect(port, host);
    }

    public static disconnect() {
        if (PrinterService.socket) {
            PrinterService.socket.end();
        }
    }

    public static print(message: Buffer) {
        if (PrinterService.socket && PrinterService.socket.writable) {
            PrinterService.socket.write(message);
        } else {
            console.log("Cannot print in thermal printer")
        }
    }
}

export const printOrder = (printOrderDTO: PrintOrderDTO) => {

    const encoder = new EscPosEncoder();

    let ticket = encoder
        .align("center")
        .line("*".repeat(10) + " LA TIA DE KAUA " + "*".repeat(10))
        .newline()
        .newline()
        // @ts-ignore
        .table(
            [
                {width: 36, marginRight: 2, align: 'left'},
                {width: 10, align: 'right', marginRight: 2},
            ],
            [
                [(encoder: EscPosEncoder) => encoder.bold().text('Producto').bold(), (encoder: EscPosEncoder) => encoder.bold().text('Cantidad').bold()],
                ...printOrderDTO.productsInOrder,
                ['      ', '='.repeat(10)],
                [(encoder: EscPosEncoder) => encoder.bold().text('Area').bold(), printOrderDTO.areaTitle],
                [(encoder: EscPosEncoder) => encoder.bold().text('Mesa').bold(), printOrderDTO.tableTitle]
            ]
        )
        .newline()
        .newline()
        .newline()
        .newline()
        .cut('full')
        .encode()

    PrinterService.print(ticket);
}
