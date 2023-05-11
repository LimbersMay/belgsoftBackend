import express, {Application} from "express";
import cookieParser from "cookie-parser";
import session from "express-session";

import {useExpressServer} from "routing-controllers";
import {AuthController, OrderController, UserController, TableController} from "./controllers";

import {COOKIE_SECRET, SERVER_PORT} from "./utils";
import db from "./models/init";
import {ErrorMiddleware} from "./middlewares";
import {Server as SocketServer} from "socket.io";
import {createServer, Server} from "http";

export class AppServer {
    public app: Application;
    public port: number;
    public httpServer: Server;
    public io: SocketServer;

    constructor() {

        this.app = express();
        this.httpServer = createServer(this.app);
        this.io = new SocketServer(this.httpServer, {
            cors: {
                origin: ["http://localhost:5000"],
                methods: ["GET", "POST", "PUT", "DELETE"],
                credentials: true
            }
        });

        this.port = parseInt(SERVER_PORT)

        // DB connection
        this.connectDB();

        // middlewares
        this.middlewares();

        // websockets
        this.websockets();
    }

    public connectDB() {
        db.authenticate().then();
    }

    public middlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({
            extended: true
        }));

        this.app.use(cookieParser(COOKIE_SECRET));

        this.app.use(session({
            secret: COOKIE_SECRET,
            resave: false,
            saveUninitialized: true,
            cookie: {
                secure: false,
                httpOnly: true,
                sameSite: true,
                maxAge: 1000 * 60 * 60 * 24, // 1 day
            }
        }));

        useExpressServer(this.app, {
            routePrefix: "/api",
            controllers: [UserController, AuthController, OrderController, TableController],
            middlewares: [ErrorMiddleware],
            cors: {
                origin: ["http://localhost:5000"],
                methods: ["GET", "POST", "PUT", "DELETE"],
                credentials: true
            }
        });
    }

    public websockets() {

        this.io.on("connection", (socket) => {
            console.log("Client connected")

            socket.on("disconnect", () => {
                console.log("Client disconnected")
            });

        });

    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}`);
        })
    }
}
