// Importar a biblioteca Express "No formato TypeScript"
import express, { Request, Response } from "express";

// Importar a conexão com o banco de dados
import { AppDataSource } from "../data-source";
// Importar a entidade
import { Situation } from "../entity/Situation";


// criar a aplicação Express
const router = express.Router();


// VISUALIZAR (rota) - Criar a rota para LISTAR as Situações
// Endereço para acessar a api através da aplicação externa com o verbo GET: http://localhost:8080/situations
router.get("/situacoes", async (req: Request, res: Response) => {

    // res.send("Listar");
    
    try {
        // Obter o repositório da entidade Situation
        const situationRepository = AppDataSource.getRepository(Situation);

        // Recupera todas as situações do banco de dados
        const situations = await situationRepository.find();

        // Retorna as situações como resposta
        res.status(200).json(situations);

        // Mata o processamento
        return;

    } catch (error) {
        // Retornar erro em caso de falha
        res.status(500).json({
            message: "Erro ao listar as situações!",
        });
        // Mata o processamento
        return;
    }
});



// CADASTRAR (rota) - Criar a rota para cadastrar a Situação
// Endereço para acessar a api através da aplicação externa com o verbo POST: http://localhost:8080/situations
// A aplicação externa deve indicar que está enviado os dados em formato de objeto: Content-Type: application/json
// Dados em formato de objeto
/*
{
    "nameSituation": "Ativo",
}
*/
router.post("/situacoes", async (req: Request, res: Response) => {
    // console.log(`Dados: ${req.body}`);
    // console.log(req.body);

    try {
        // Receber os dados enviados no corpo da requisição
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
            message: "Erro! Situação não pode ser cadastrada.",
        });
    }
});

// Exportar a instrução que está dentro da constante router
export default router;