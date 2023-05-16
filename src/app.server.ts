import express, {Application} from "express";
import cookieParser from "cookie-parser";
import session from "express-session";

import {useExpressServer} from "routing-controllers";
import {AuthController, OrderController, UserController, TableController, MenuController} from "./controllers";

import {COOKIE_SECRET, SERVER_PORT, verifyToken} from "./utils";
import db from "./models/init";
import {ErrorMiddleware} from "./middlewares";

export class AppServer {
    public app: Application;
    public port: number;

    constructor() {

        this.app = express();

        this.port = parseInt(SERVER_PORT)

        // DB connection
        this.connectDB();

        // middlewares
        this.middlewares();
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
            controllers: [UserController, AuthController, OrderController, TableController, MenuController],
            middlewares: [ErrorMiddleware],
            cors: {
                origin: ["http://localhost:5173"],
                methods: ["GET", "POST", "PUT", "DELETE"],
                credentials: true
            },
            defaultErrorHandler: false,
            authorizationChecker: async (action, roles: string[]) => {

                const token = action.request.headers["x-token"];
                const payload = await verifyToken(`${token}`);

                return roles.includes(payload.role);
            },
            currentUserChecker: async (action) => {
                const token = action.request.headers["x-token"];
                return await verifyToken(`${token}`);
            }
        });
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}`);
        })
    }
}
