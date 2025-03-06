// Importar a biblioteca Express "No formato TypeScript"
import express, { Request, Response } from "express";

// Importar a conexão com o banco de dados
import { AppDataSource } from "../data-source";

import { ProductSituation } from "../entity/ProductSituation";


// criar a aplicação Express
const router = express.Router();


// VISUALIZAR (rota) - Criar a rota para LISTAR as Situações
// Endereço para acessar a api através da aplicação externa com o verbo GET: http://localhost:8080/produto-situacao
router.get("/produto-situacao", async (req: Request, res: Response) => {

    // res.send("Listar");

    try {
        // Pegar o repositório da entidade ProductSituation
        const productSituationsRepository = AppDataSource.getRepository(ProductSituation);

        // Recupero todas as situações do Produto
        const productSituations = await productSituationsRepository.find();

        // Retono as Situações com resposta - Objeto jSon({})
        res.status(200).json({ productSituations });

        // Mata o processamento
        return;

    } catch (error) {
        // Retornar erro em caso de falha
        res.status(500).json({
            message: "Erro ao listar as situações do Produto!",
        });
        // Mata o processamento
        return;
    }
});

// Rota para visualizar uma situação de uma categoria específica
// Endereço para acessar a api através da aplicação externa com o verbo GET: http://localhost:8080/produto-situacao/:id
// const { id } -> Desestruturação: Pega apenas o que for indicado na desestruturação
router.get("/produto-situacao/:id", async (req: Request, res: Response) => {

    try {
        // Obter o ID da situação a partir dos parâmetros da requisição [fazer um desestruturação]
        const { id } = req.params;

        // Obter o repositório da entidade Situation do Produto
        const productSituationRepository = AppDataSource.getRepository(ProductSituation);

        // Buscar a situação no banco de dados pelo ID
        const productSituation = await productSituationRepository.findOneBy({ id: parseInt(id) });

        // Verificar se a situação foi encontrada
        if (!productSituation) {
            res.status(404).json({
                message: "Situação da categoria não encontrada."
            });

            // Mata o processamento
            return;
        }

        // Retornar a situação encontrada
        res.status(200).json({ productSituation });

        // Mata o processamento
        return;

    } catch (error) {
        res.status(500).json({
            message: "Erro! Não encontramos essa situação para o produto."
        });

        // Mata o processamento
        return;
    }
});





// CADASTRAR (rota) - Criar a rota para cadastrar a as categorias.
// Endereço para acessar a api através da aplicação externa com o verbo POST: http://localhost:8080/produto-situacao
// A aplicação externa deve indicar que está enviado os dados em formato de objeto: Content-Type: application/json
// Dados em formato de objeto
/*
{
    "name": "Ativo",
}
*/
router.post("/produto-situacao", async (req: Request, res: Response) => {

    // Receber os dados enviados no coro da requisição
    // console.log(req.body);

    try {
        // Criar a instancia do repositório de Situação
        const productSituationRepository = AppDataSource.getRepository(ProductSituation);

        // Criar um novo registro da Situação (dados Simulados)
        const newProductSituation = productSituationRepository.create(req.body); // Valor dinâmico 

        // Salvar o registro no banco de dados
        await productSituationRepository.save(newProductSituation);

        // Retornar resposta de sucesso
        res.status(201).json({
            message: "Sucesso! Situação cadastrada.",
            situation: newProductSituation, // Recebe o retorno do banco
        });

    } catch (error) {
        res.status(500).json({
            message: "Erro! Situação não pode ser cadastrada.",
        });
    }
});

// Exportar a instrução que está dentro da constante router
export default router;