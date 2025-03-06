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