// Importar a biblioteca Express "No formato TypeScript"
import express, { Request, Response } from "express";

// Importar a conexão com o banco de dados
import { AppDataSource } from "../data-source";

import { ProductSituation } from "../entity/ProductSituation"; 


// criar a aplicação Express
const router = express.Router();

// Criar a rota para listar as categorias
// Endereço para acessar a api através da aplicação externa com o verbo GET: http://localhost:8080/produto-situacao
router.get("/produto-situacao", async (req: Request, res: Response) => {

    try {
        // Criar a instancia do repositório de Situação
        const productSituationRepository = AppDataSource.getRepository(ProductSituation);

        // Criar um novo registro da Situação (dados Simulados)
        const newProductSituation = productSituationRepository.create({
            name: "Ativo", // Valor fixo para simuar o cadastro
        });

        // Salvar o registro no banco de dados
        await productSituationRepository.save(newProductSituation);

        // Retornar resposta de sucesso
        res.status(201).json({
            message: "Sucesso! Situação cadastrada.",
            situation: newProductSituation, // Recebe o retorno do banco
        });

    } catch (error) {
        res.status(500).json({
            message: "Erro! Situação não cadastrada.",
        });
    }
});

// Exportar a instrução que está dentro da constante router
export default router;