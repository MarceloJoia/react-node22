// Importar a biblioteca Express "No formato TypeScript"
import express, { Request, Response } from "express";

// Importar o arquivo com as credenciais do Banco de Dados
import { AppDataSource } from "../data-source";

// criar a aplicação Express
const router = express.Router();

// Fazer a conexão com o bamco de dados
AppDataSource.initialize()
    .then(() => {
        console.log("Secesso! Conexão com o Banco de Dados realizada.");
    })
    .catch((error) => {
        console.log("Error! Conexão com o Banco de Dados não realizada.", error);
    });

// Criar a rota GET principal
router.get("/", (req: Request, res: Response) => {
    res.send("Bem-vindo Marcelo!");
});

// Exportar a instrução que está dentro da constante router
export default router;