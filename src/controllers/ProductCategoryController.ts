// Importar a biblioteca Express "No formato TypeScript"
import express, { Request, Response } from "express";

// Importar a conexão com o banco de dados
import { AppDataSource } from "../data-source";
// Importar a entidade
import { ProductCategory } from "../entity/ProductCategory";


// criar a aplicação Express
const router = express.Router();

// Criar a rota para listar as categorias
// Endereço para acessar a api através da aplicação externa com o verbo GET: http://localhost:8080/produto-categorias
router.get("/produto-categorias", async (req: Request, res: Response) => {

    try {
        // Criar a instancia do repositório de Situação
        const productCategoryRepository = AppDataSource.getRepository(ProductCategory);

        // Criar um novo registro de situação (dados simulados)
        const newProductCategory = productCategoryRepository.create({
            name: "Apartamento", // Valor fixo para simular o cadastro
        });

        // Salvar o registro no banco de dados
        await productCategoryRepository.save(newProductCategory);

        // Retornar resposta de sucesso
        res.status(201).json({
            message: "Sucesso! Categoria cadastrada.",
            category: newProductCategory, // Recebe o retorno do banco
        });

    } catch (error) {
        res.status(500).json({
            message: "Erro! Categoria não cadastrada.",
        });
    }
});

// Exportar a instrução que está dentro da constante router
export default router;