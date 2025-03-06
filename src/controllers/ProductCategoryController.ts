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

// Rota para visualizar uma única Categoria do Produto
// Endereço para acessar a api através da aplicação externa com o verbo GET: http://localhost:8080/produto-categorias/:id
// const { id } -> Desestruturação: Pega apenas o que for indicado na desestruturação
router.get("/produto-categorias/:id", async (req: Request, res: Response) => {
    // res.send("Listar uma única categoria!");

    try {
        // Obter o ID da Categoria do Produto partir dos parâmetros da requisição
        const { id } = req.params; // [fazer um desestruturação]

        // Obter o repositório da entidade Categoria do Produto
        const productCategoryRepository = AppDataSource.getRepository(ProductCategory);

        // Buscar a Categoria do Produto no banco de dados pelo ID
        const productCategory = await productCategoryRepository.findOneBy({ id: parseInt(id) });

        // Verificar se a Categoria do Produto foi encontrada
        if (!productCategory) {
            res.status(404).json({
                message: "Categoria do prtoduto não encontrada."
            });
            // Mata o processamento
            return;
        }

        // Retornar a Categoria do Produto encontrada
        res.status(200).json({ productCategory });

        // Mata o processamento
        return;

    } catch (error) {
        res.status(500).json({
            message: "Erro! Não foi possível apresentar a Categorias do Produto."
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
        // Criar a instancia do repositório de Produto
        const productCategoryRepository = AppDataSource.getRepository(ProductCategory);

        // Criar um novo registro de Produto (dados simulados)
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




// Criar a rota para editar uma Categoria do Produto
// Endereço para acessar a API através da aplicação externa com o verbo PUT: http://localhost:8080/produto-categorias/:id
// A aplicação externa deve indicar que está enviado os dados em formato de objeto: Content-Type: application/json
// Dados em formato de objeto
/*
{
    "nameSituation": "Ativo"
}
*/
router.put("/produto-categorias/:id", async (req: Request, res: Response) => {
    // res.send("Categoria do Produto editar");

    // ProductCategory
    try {
        // Obter o ID da Categoria do Produto partir dos parâmetros da requisição
        const { id } = req.params;// Desestruturação

        // Pegar o que está vindo no corpo da requisição
        const data = req.body;

        // Obter o repositório da entidade ProductSituation
        const productCategoryRepository = AppDataSource.getRepository(ProductCategory);

        // Buscar a ProductSituation no banco de dados pelo ID
        const productCategory = await productCategoryRepository.findOneBy({ id: parseInt(id) });

        // Verificar se a ProductSituation foi encontrada
        if (!productCategory) {
            res.status(500).json({
                message: "Categoria do prtoduto não encontrada."
            });
            // Mata o processamento
            return;
        }

        // Atualizar os dados do ProductSituation
        productCategoryRepository.merge(productCategory, data);

        // Salvar as alterações no banco de dados
        const updateProductCategory = await productCategoryRepository.save(productCategory);

        // Retornar resposta de sucesso
        res.status(201).json({
            message: "Sucesso! Categoria do Produto editada.",
            productCategory: updateProductCategory
        });

        // Mata o processamento
        return;

    } catch (error) {
        // Retornar resposta de Erro
        res.status(500).json({
            message: "Erro! Categoria do Produto não pode ser editada.",
        });
        // Mata o processamento
        return;
    }
});








// Exportar a instrução que está dentro da constante router
export default router;