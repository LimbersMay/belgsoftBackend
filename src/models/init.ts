import { Sequelize } from 'sequelize-typescript';
import {DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER} from "../utils/secrets";

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: parseInt(DB_PORT.toString()),
    dialect: 'mysql',
    logging: false
});
