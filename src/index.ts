// Importar a biblioteca Express "No formato TypeScript"
import express from "express";

// 1) Importar a bibliotéca com as variáveis de ambiente .env
import dotenv from "dotenv";

// 2) Carregar as variáveis de ambiente
dotenv.config();

// criar a aplicação Express
const app = express();

// Criar o Middleware para receber os dados no corpo da requisição
app.use(express.json());

// Incluir a Controller
import AuthController from './controllers/AuthController';
import SituationController from './controllers/SituationController';
import ProductCategoryController from './controllers/ProductCategoryController';
import ProductSituationController from './controllers/ProductSituationController';
import ProductController from './controllers/ProductController';

// Criar as rotas. Express para gerenciar as requisições, rotas e URLs, entre outra funcionalidades.
app.use('/', AuthController);
app.use('/', SituationController);
app.use('/', ProductCategoryController);
app.use('/', ProductSituationController);
app.use('/', ProductController);

// Iniciar o serrvidor na porta definida na variável de ambiente .env
app.listen(process.env.PORT, () => {
    console.log(`Servidor iniciado na porta ${process.env.PORT}: http://localhost:${process.env.PORT}`);
});


