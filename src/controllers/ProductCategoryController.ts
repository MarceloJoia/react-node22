// Importar a biblioteca Express "No formato TypeScript"
import express, { Request, Response } from "express";

// Importar a conexão com o banco de dados
import { AppDataSource } from "../data-source"; // Importar a entidade
import { ProductCategory } from "../entity/ProductCategory"; // Importar a entidade

// criar a aplicação Express
const router = express.Router();

// VISUALIZAR (criar rota) - Criar a rota para LISTAR as Categorias do Produto
// Endereço para acessar a api através da aplicação externa com o verbo GET: http://localhost:8080/produto-categorias
router.get("/produto-categorias", async (req: Request, res: Response) => {

    // res.send("Listar Categorias");

    try {
        // Crindo uma instancia da entidade ProductCategory
        const productCategoryRepository = AppDataSource.getRepository(ProductCategory);

        // Fazer a consulta no bancode dados para retornar TODAS as Categorias do produto.
        const productCategory = await productCategoryRepository.find();

        // Retornar uma resposta sobre a consulta feita a cima 
        res.status(200).json({ productCategory });

        // Matar o precessamento
        return;

    } catch (error) {
        res.status(500).json({
            message: "Erro! Não foi possível listar as categorias do produto."
        });

        // Matar o precessamento
        return;
    }
});






// CADASTRAR (criar rota) - Criar a rota para cadastrar as Categorias do Produto
// Endereço para acessar a api através da aplicação externa com o verbo POST: http://localhost:8080/produto-categorias
// A aplicação externa deve indicar que está enviado os dados em formato de objeto: Content-Type: application/json

// Dados em formato de objeto
/*
{
    "name": "Ativo",
}
*/
router.post("/produto-categorias", async (req: Request, res: Response) => {

    try {
        // Criar a instancia do repositório de Situação
        const productCategoryRepository = AppDataSource.getRepository(ProductCategory);

        // Criar um novo registro de situação (dados simulados)
        const newProductCategory = productCategoryRepository.create(req.body);

        // Salvar o registro no banco de dados
        await productCategoryRepository.save(newProductCategory);

        // Retornar resposta de sucesso
        res.status(201).json({
            message: "Sucesso! Categoria cadastrada.",
            category: newProductCategory, // Recebe o retorno do banco
        });

    } catch (error) {
        res.status(500).json({
            message: "Erro! Categoria não pode ser cadastrada.",
        });
    }
});

// Exportar a instrução que está dentro da constante router
export default router;