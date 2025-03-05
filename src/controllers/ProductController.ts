// Importar a biblioteca Express "No formato TypeScript"
import express, { Request, Response } from "express";

// Importar a conexão com o banco de dados
import { AppDataSource } from "../data-source";
// Importar a entidade
import { Product } from "../entity/Product";


// criar a aplicação Express
const router = express.Router();

// Criar a rota para listar as categorias
// Endereço para acessar a api através da aplicação externa com o verbo GET: http://localhost:8080/produtos
router.get("/produto-categorias", async (req: Request, res: Response) => {

    try {
        // Criar a instancia do repositório de Product
        const productRepository = AppDataSource.getRepository(Product);

        // Criar um novo registro de Product (dados simulados)
        const newProduct = productRepository.create({
            name: "Edifío Maria Antônia", // Valor fixo para simular o cadastro
        });

        // Salvar o registro no banco de dados
        await productRepository.save(newProduct);

        // Retornar resposta de sucesso
        res.status(201).json({
            message: "Sucesso! Produto cadastrado.",
            product: newProduct, // Recebe o retorno do banco
        });

    } catch (error) {
        
        console.log(error);

        res.status(500).json({
            message: "Erro! Produto não cadastrado.",
        });
    }
});

// Exportar a instrução que está dentro da constante router
export default router;