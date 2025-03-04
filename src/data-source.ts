import "reflect-metadata";
import { DataSource } from "typeorm";

// 1) Importar a bibliotéca com as variáveis de ambiente .env
import dotenv from "dotenv";

// 2) Carregar as variáveis de ambiente
dotenv.config();

const dialect = process.env.DB_DIALECT ?? "mysql";

export const AppDataSource = new DataSource({
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    type: dialect as "mysql" | "mariadb",
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    synchronize: false, // Evite usar isso em produção
    logging: true,
    entities: [],
    subscribers: [],
    migrations: [__dirname + "/migration/*.js"], // Executa todas as migration que estiver dentro do diretório [migration]
});