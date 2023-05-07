import {config } from 'dotenv';
config({
    path: '.development.env'
});

import { AppServer } from "./src/app.server";
const server = new AppServer();

server.listen();
