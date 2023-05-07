import express from "express";
import {Application} from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import {COOKIE_SECRET, SERVER_PORT} from "./utils/secrets";

import db from "./models/init";

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
        }))
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}`);
        })
    }
}
