# Cronos Backend

Backend da aplicação Cronos, desenvolvido com Node.js, Express e Sequelize.

## Tecnologias

- Node.js
- Express.js
- Express Validator
- JWT (JSON Web Token)
- Sequelize
- MySQL
- Swagger
- Vitest

## Pré-requisitos

- Node.js instalado
- pnpm instalado
- Uma instância MySQL disponível

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/guic1978/backend-deloitte.git
   cd backend-deloitte
   ```

2. Instale as dependências:

   ```bash
   pnpm install
   ```

3. Crie um arquivo `.env` na raiz do projeto com as configurações do banco e do JWT:

   ```env
   DATABASE_NAME=nome_do_banco
   DATABASE_LOGIN=usuario_do_banco
   DATABASE_PWD=senha_do_banco
   DATABASE_HOST=localhost
   DATABASE_PORT=3306
   JWT_SECRET=sua_chave_secreta
   ```

## Executando o projeto

Para iniciar a aplicação:

```bash
pnpm start
```

O servidor será iniciado na porta `8080` por padrão. Para desenvolvimento, com reinicialização automática:

```bash
pnpm run start-dev
```

Também é possível definir outra porta usando a variável de ambiente `PORT`.

## Testes

Execute a suíte de testes com:

```bash
pnpm test
```

## Documentação da API

A documentação interativa está disponível no Swagger:

- Local: <http://localhost:8080/api/docs/>
- Produção: <https://cronos-backend-delloite.herokuapp.com/api/docs/#/>

## Usuários para teste

### Administrador

```text
E-mail: guilherme.guic@gmail.com
Senha: 12345
```

### Visualizador

```text
E-mail: guilherme.guic2@gmail.com
Senha: 12345
```

## Links

- [Código-fonte no GitHub](https://github.com/guic1978/backend-deloitte)
- [LinkedIn de Guilherme Reis](https://www.linkedin.com/in/guilherme-reis-1a74a6b/)

## Autor

Guilherme Reis
