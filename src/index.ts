// Importar a biblioteca Express "No formato TypeScript"
import express, { Request, Response } from "express";

// criar a aplicação Express
const app = express();

// Criar a rota GET principal
app.get("/", (req: Request, res: Response) => {
    res.send("Bem-vindo Celke!");
});

// Iniciar o serrvidor na porta 8080
app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080: http://localhost:8080");
});