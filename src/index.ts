// Importar a biblioteca Express "No formato TypeScript"
import express from "express";


// criar a aplicação Express
const app = express();


// Incluir a Controller
import login from './controllers/login';


// Criar as rotas. Express para gerenciar as requisições, rotas e URLs, entre outra funcionalidades.
app.use('/', login);


// Iniciar o serrvidor na porta 8080
app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080: http://localhost:8080");
});


