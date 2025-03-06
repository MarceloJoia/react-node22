// Importar a biblioteca Express "No formato TypeScript"
import express, { Request, Response } from "express";

// Importar a conexão com o banco de dados
import { AppDataSource } from "../data-source";
// Importar a entidade
import { Situation } from "../entity/Situation";

// criar a aplicação Express
const router = express.Router();

// VISUALIZAR (rota) - Criar a rota para LISTAR as Situações
// Endereço para acessar a api através da aplicação externa com o verbo GET: http://localhost:8080/situacoes
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


// Rota para visualizar uma situação específica
// Endereço para acessar a api através da aplicação externa com o verbo GET: http://localhost:8080/situacoes/:id
// const { id } -> Desestruturação: Pega apenas o que for indicado na desestruturação
router.get("/situacoes/:id", async (req: Request, res: Response) => {
    // res.send("Listar uma única Situação");

    try {
        // Obter o ID da situação a partir dos parâmetros da requisição [fazer um desestruturação]
        const { id } = req.params; // Pega apenas o id

        // Obter o repositório da entidade Situation
        const situationRepository = AppDataSource.getRepository(Situation);

        // Buscar a situação no banco de dados pelo ID
        const situation = await situationRepository.findOneBy({ id: parseInt(id) });

        // Verificar se a situação foi encontrada
        if (!situation) {
            res.status(404).json({
                message: "Atensão! Situação não encontrada!"
            });
            // Mata o processamento
            return;
        }

        // Retornar a situação encontrada
        res.status(200).json({ situation });

        // Mata o processamento
        return;

    } catch (error) {
        res.status(500).json({
            message: "Erro! Não encontramos essa situação."
        });
        // Mata o processamento
        return;
    }
});


// CADASTRAR (rota) - Criar a rota para cadastrar a Situação
// Endereço para acessar a api através da aplicação externa com o verbo POST: http://localhost:8080/situacoes
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
        // Mata o processamento
        return;
    }
});


// CADASTRAR (criar a rota) - Criar a rota para editar uma situação
// Endereço para acessar a API através da aplicação externa com o verbo PUT: http://localhost:8080/situacoes/:id
// A aplicação externa deve indicar que está enviado os dados em formato de objeto: Content-Type: application/json
// Dados em formato de objeto
/*
{
    "nameSituation": "Ativo"
}
*/
router.put("/situacoes/:id", async (req: Request, res: Response) => {
    // res.send("Editar");
    try {

        // Obter o ID da situação a partir dos parâmetros da requisição
        const { id } = req.params; // Desestruturação

        // Receber os dados enviados no corpo da requisição
        const data = req.body;

        // Obter o repositório da entidade Situation
        const situationRepository = AppDataSource.getRepository(Situation);

        // Buscar a situação no banco de dados pelo ID
        const situation = await situationRepository.findOneBy({ id: parseInt(id) });

        // Verificar se a situação foi encontrada
        if (!situation) {
            res.status(404).json({
                message: "Atensão! Situação não encontrada!"
            });
            // Mata o processamento
            return;
        }

        // Atualizar os dados da situação
        situationRepository.merge(situation, data);

        // Salvar as alterações no banco de dados
        const updateSituation = await situationRepository.save(situation);

        // Retornar resposta de sucesso
        res.status(201).json({
            message: "Sucesso! Situação Editada.",
            situation: updateSituation, // Recebe o retorno do banco
        });

        // Mata o processamento
        return;

    } catch (error) {
        // Retornar resposta de Erro
        res.status(500).json({
            message: "Erro! Situação não pode ser Editada.",
        });
        // Mata o processamento
        return;
    }
});











// Exportar a instrução que está dentro da constante router
export default router;