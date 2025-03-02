## Requisitos

* Node.js 22 ou superior - Conferir a versão: node -v

## Como rodar o projeto baixado

Instalar todas as dependencias indicada pelo package.json.
```
npm install
```

Compilar o arquivo TypeScript.
```
npx tsc
```

Executar o arquivo gerado com Node.js.
```
node dist/index.js
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

Baixar os arqbuivos do git
```
git clone --b <nome da branch>  <repositório> .
git clone --branch develop  git@github.com:MarceloJoia/react-node22.git .
```

Verificar a branch 
```
git branch
```

UPDATE - Verificar se algum outro Dev enviou uma atualização. 
Se tivesse alguma alteração, seria feito o download
```
git pull
```







