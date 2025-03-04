import "reflect-metadata";
import { DataSource } from "typeorm";
import { Situation } from "./entity/Situation";
import { User } from "./entity/User";

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
    entities: [Situation, User],
    subscribers: [],
    migrations: [__dirname + "/migration/*.js"], // Executa todas as migration que estiver dentro do diretório [migration]
});

// Fazer a conexão com o bamco de dados
AppDataSource.initialize()
    .then(() => {
        console.log("Secesso! Conexão com o Banco de Dados realizada.");
    })
    .catch((error) => {
        console.log("Error! Conexão com o Banco de Dados não realizada.", error);
    });
