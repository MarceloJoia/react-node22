## Requisitos

* Node.js 22 ou superior - Conferir a versão: node -v
* MySQL 8 ou superior - Conferir a versão: mysql --version

## Como rodar o projeto baixado

Instalar todas as dependencias indicada pelo package.json.
```
npm install
```

Compilar o arquivo TypeScript. Executar o arquivo gerado.
```
npm run start:watch
```

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
Situação Migration
```
npx typeorm migration:create src/migration/CreateSituationsTable
```
Usuário Migration
```
npx typeorm migration:create src/migration/CreateUsersTable
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