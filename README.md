## Requisitos

No VSCode fazer a seguinte configuração:
Path: File/Preferencias/Configurações 
Procurar por [stickyScroll] e desativar

* Node.js 22 ou superior - Conferir a versão: node -v
* MySQL 8 ou superior - Conferir a versão: mysql --version


## Como rodar o projeto baixado
Duplicar o arquivo ".env.example" e renomear para ".env".<br>
Alterar no arquivo .env as credenciais do banco de dados<br>

Instalar todas as dependencias indicada pelo package.json.
```
npm install
```

Compilar o arquivo TypeScript. Executar o arquivo gerado.
```
npm run start:watch
```

Executar as migrations para criar as tabelas no banco de dados.
```
npx typeorm migration:run -d dist/data-source.js
```

Importar a collection do diretório "Thunder-client" para o Thunder Client no VS Code.<br>
Alterar a URL em "Base URL" no Thunder-client. Por padrão é "http://localhost:8080".<br>

## Sequencia para criar o projeto
Criar o arquivo package.
```
npm init
```

Instalar o Express para gerenciar as requisições, rotas e URLs, entre outra funcionalidades.
```
npm i express
```

Instalar os pacotes para suporte ao TypeScript.
```
npm i --save-dev @types/express
npm i --save-dev @types/node
```

Instalar o compilador projeto com TypeScript e reiniciar o projeto quando o arquivo é modificado.
```
npm i --save-dev ts-node
```

Gerar o arquivo de configuração para o TypeScript.
```
npx tsc --init
```

Compilar o arquivo TypeScript.
```
npx tsc
```

Executar o arquivo gerado com Node.js.
```
node dist/index.js
```

Instalar a dependência para rodar processo simultaneamente.
```
npm install --save-dev concurrently
```

Compilar o arquivo TypeScript. Executar o arquivo gerado.
```
npm run start:watch
```

Importar a collection do diretório "Thunder-Client" para o Thunder Client


### MySQL
1. Iniciar o MySQL no PowerShell como Admin
```
net start mysql80
```
2. Acessar o MySQL no terminal
```
mysql -h localhost -u root -p
```
3. Mostrar bancos de dados
```
SHOW DATABASES;
```
4. Sair do MySQL
```
exit
```
5. Crair base da dados
```
CREATE DATABASE joia CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### ENV
1. Manipular variáveis de ambiente.
```
npm install dotenv --save
```

2. Instalar os tipos do TypeScript.
```
npm install --save-dev @types/dotenv
```
3. Criar o arquivo .env na raiz
```
.env
```
4. Propular .env

```
TIME_ZONE=America/Sao_Paulo

TIME_ZONE=America/Sao_Paulo

DB_USERNAME="" # Usuário do banco de dados
DB_PASSWORD="" # Senha do banco de dados
DB_DATABASE="" # Base de dados
DB_HOST="localhost" # Local do banco de dados
DB_DIALECT='mysql' # Tipo do banco de dados
DB_PORT=3306 # Tipo do banco de dados

PORT=8080

```


### TypeORM (migrations)
MyProject
├── src                   // place of your TypeScript code
│   ├── entity            // place where your entities (database models) are stored
│   │   └── User.ts       // sample entity
│   ├── migration         // place where your migrations are stored
│   ├── data-source.ts    // data source and all connection configuration
│   └── index.ts          // start point of your application
├── .gitignore            // standard gitignore file
├── package.json          // node module dependencies
├── README.md             // simple readme file
└── tsconfig.json         // TypeScript compiler options



1. Instale o pacote npm:
```
npm install typeorm --save
```

2. Instalar a Biblioteca utilizada na TypeScript para adicionar Metadados(Informações adicionais) a classe.
```
npm install reflect-metadata --save
```

3. Instalar um driver de banco de dados:
```
npm install mysql2 --save
```

4. Migration
    1. Situação Migration
    ```
    npx typeorm migration:create src/migration/CreateSituationsTable
    ```
    2. Usuário Migration
    ```
    npx typeorm migration:create src/migration/CreateUsersTable
    ```

    3. Cria as tabelas no banco de dados - Arquivo COMPILADO
    ```
    npx typeorm migration:run -d dist/data-source.js
    ```

## Como enviar e baixar os arquivos do GitHub

Baixar os arquivos do Git.
```
git clone -b <branch_name> <repository_url> .
```

Verificar em qual está branch.
```
git branch 
```

Baixar as atualizações do GitHub.
```
git pull
```

Adicionar todos os arquivos modificados no staging area - área de preparação.
```
git add .
```

commit representa um conjunto de alterações em um ponto específico da história do seu projeto, registra apenas as alterações adicionadas ao índice de preparação.
O comando -m permite que insira a mensagem de commit diretamente na linha de comando.
```
git commit -m "Base projeto"
```

Enviar os commits locais, para um repositório remoto.
```
git push <remote> <branch>
git push origin develop
```




### Check List para criar Entidade(Entity), Seed e Cadastra no Bonco de dados
- Search: TypeORM
Entity
	Product.ts
	ProductCategory.ts
	ProductSituation.ts

1)data-source.ts
    a) Preparar o [ data-source.ts ]
    ```
    // Importar a bibliotéca com as variáveis de ambiente .env
    import dotenv from "dotenv";
    // Carregar as variáveis de ambiente
    dotenv.config();
    ```
    b) Acrecentar as entidades no array de [ entities ]
    ```
    entities: [Situation, User],
    ```
    c) Tirar da login.ts [ Que será renomeado para AuthController.ts ] a conexão com o banco de dados.
    ATENÇÃO: Após renomear o arquivo, verificar na index.ts se o caminho foi atualizado.
    ```
    // Fazer a conexão com o bamco de dados
    AppDataSource.initialize()
        .then(() => {
            console.log("Secesso! Conexão com o Banco de Dados realizada.");
        })
        .catch((error) => {
            console.log("Error! Conexão com o Banco de Dados não realizada.", error);
        });

    ```

2)Agustar: data_source.ts
    a) Incluir as Entidades

3)Criar as Migrattion
    a) Criar a Migration
    ```
    npx typeorm migration:create src/migration/CreateProductsCategoriesTable
    npx typeorm migration:create src/migration/CreateProductsSituationsTable
    npx typeorm migration:create src/migration/CreateProductsTable
    ```
    
    b) Rodar a Migrate - Arquivo COMPILADO
    ```
    npx typeorm migration:run -d dist/data-source.js
    ```

4)Implementar as Controllers
    a) Usar como exemlo [SituationController.ts]
    b) Acrescentar as rotas na [index.ts]
        // Incluir a Controller
        import AuthController from './controllers/AuthController';
        // Criar as rotas.
        app.use('/', AuthController);
    


### Thunder client Dados de teste para a API





## CRUD Check-List

### Listar
```
// VISUALIZAR (rota) - Criar a rota para LISTAR as Situações
// Endereço para acessar a api através da aplicação externa com o verbo GET: http://localhost:8080/situacoes

// Pegar o repositório da entidade ProductSituation

// Recupero todas as situações do Produto

// Retono as Situações com resposta - Objeto jSon({})

// Mata o processamento
return;
```


### Visualizar
```
// Rota para visualizar uma situação específica
// Endereço para acessar a api através da aplicação externa com o verbo GET: http://localhost:8080/situacoes/:id
// const { id } -> Desestruturação: Pega apenas o que for indicado na desestruturação

// Obter o ID da situação a partir dos parâmetros da requisição [fazer um desestruturação]

// Obter o repositório da entidade Situation do Produto

// Buscar a situação no banco de dados pelo ID

// Verificar se a situação foi encontrada

// Retornar a situação encontrada

// Mata o processamento
return;
```


### Cadastrar
```
// Criar a rota para cadastrar a Situação
// Endereço para acessar a api através da aplicação externa com o verbo POST: http://localhost:8080/situacoes
// A aplicação externa deve indicar que está enviado os dados em formato de objeto: Content-Type: application/json
// Dados em formato de objeto
/*
{
    "nameSituation": "Ativo",
}
*/

// Criar a instancia do repositório de Situação

// Criar um novo registro da Situação (dados Simulados)

// Salvar o registro no banco de dados

// Retornar resposta de sucesso
```


### Editar
```
// Criar a rota para editar uma situação
// Endereço para acessar a API através da aplicação externa com o verbo PUT: http://localhost:8080/situacoes/:id
// A aplicação externa deve indicar que está enviado os dados em formato de objeto: Content-Type: application/json
// Dados em formato de objeto
/*
{
    "nameSituation": "Ativo"
}
*/

// Obter o ID da situação a partir dos parâmetros da requisição

// Receber os dados enviados no corpo da requisição

// Obter o repositório da entidade ProductSituation

// Buscar a ProductSituation no banco de dados pelo ID

// Verificar se a ProductSituation foi encontrada

// Atualizar os dados do ProductSituation

// Salvar as alterações no banco de dados

// Retornar resposta de sucesso

// Mata o processamento
return;
```


### Deletar
```
// Criar a rota para apagar uma situação
// Endereço para acessar a API através da aplicação externa com o verbo DELETE: http://localhost:8080/situacoes/:id

try {
        // Obter o ID da situação a partir dos parâmetros da requisição 

        // Obter o repositório da entidade Situation

        // Buscar a situação no banco de dados pelo ID

        // Verificar se a situação foi encontrada

        // Remover a situação do banco de dados

        // Retornar resposta de sucesso

        // Mata o processamento
        return;
    } catch (error) {
        
    }
```
