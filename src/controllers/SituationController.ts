// Importar a biblioteca Express "No formato TypeScript"
import express, { Request, Response } from "express";

// Importar a conexão com o banco de dados
import { AppDataSource } from "../data-source";
// Importar a entidade
import { Situation } from "../entity/Situation";


// criar a aplicação Express
const router = express.Router();

// Criar a rota GET principal URL: http://localhost:8080/situacoes
router.post("/situacoes", async (req: Request, res: Response) => {

    // console.log(`Dados: ${req.body}`);
    // console.log(req.body);

    try {
        // Receber os dados enviados no coro da requisição
        var data = req.body;

        // Criar a instancia do repositório de Situação
        const situationRepository = AppDataSource.getRepository(Situation);

        // Criar um novo registro da Situação (dados Simulados)
        const newSituation = situationRepository.create(data); // Valor dinâmico retornado do banco
        // const newSituation = situationRepository.create(req.body); // Valor dinâmico retornado do banco

        // Salvar o registro no banco de dados
        await situationRepository.save(newSituation);

        // Retornar resposta de sucesso
        res.status(201).json({
            message: "Sucesso! Situação cadastrada.",
            situation: newSituation, // Recebe o retorno do banco
        });

    } catch (error) {
        // Retornar resposta de Erro
        // console.log(error);

        res.status(500).json({
            message: "Erro! Situação não cadastrada.",
        });
    }
});

// Exportar a instrução que está dentro da constante router
export default router;