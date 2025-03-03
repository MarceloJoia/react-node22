// Importar a biblioteca Express "No formato TypeScript"
import express, { Request, Response } from "express";

// criar a aplicação Express
const router = express.Router();

// Criar a rota GET principal
router.get("/", (req: Request, res: Response) => {
    res.send("Bem-vindo Marcelo!");
});

// Exportar a instrução que está dentro da constante router
export default router;