// Importar a biblioteca Express "No formato TypeScript"
import express from "express";

// 1) Importar a bibliotéca com as variáveis de ambiente .env
import dotenv from "dotenv";
// 2) Carregar as variáveis de ambiente
dotenv.config();

// criar a aplicação Express
const app = express();

// Incluir a Controller
import login from './controllers/login';

// Criar as rotas. Express para gerenciar as requisições, rotas e URLs, entre outra funcionalidades.
app.use('/', login);

// Iniciar o serrvidor na porta definida na variável de ambiente .env
app.listen(process.env.PORT, () => {
    console.log(`Servidor iniciado na porta ${process.env.PORT}: http://localhost:${process.env.PORT}`);
});


