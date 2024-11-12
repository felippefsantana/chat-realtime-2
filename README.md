# Chat Realtime API

Este projeto é uma aplicação de chat em tempo real utilizando **Node.js**, **Express.js**, **Typescript**, **Prisma**, **Redis**, **PostgreSQL** e **BullMQ**. A aplicação é containerizada usando **Docker** e pode ser facilmente executada localmente para desenvolvimento.

## Passos para Iniciar o Projeto

### 1. Clonando o Repositório

Primeiro clone o repositório para sua máquina local:

```bash
git clone https://github.com/felippefsantana/chat-realtime-2.git
cd chat-realtime-2
```

### 2. Configurando Variávies de Ambiente

O projeto utiliza variáveis de ambiente para configurar a conexão com o banco de dados PostgreSQL, Redis, e outras informações importantes.

1. Copie o arquivo `.env.example` para um nova  arquivo `.env`:

```bash
cp .env.example .env
```

2. Abra o arquivo `.env` e ajuste as variáveis de acordo com seu ambiente. As variáveis mais importantes incluem:
* `NODE_ENV`: Define o ambiente de execução (`development`, `production`).
* `APP_HOST`, `APP_PORT`, `APP_URL`: Configurações da aplicação.
* `POSTGRES_*`: Configurações do banco de dados PostgreSQL.
* `REDIS_HOST`, `REDIS_PORT`: Configurações do Redis.

**Alterações nas portas podem ser necessarias**

### 3. Construindo e Inicializando os Contâineres com Docker Compose

Agora que as variáveis de ambiente estão configuradas, podemos usar o Docker Compose para construir e inicializar os contêineres necessários.

1. Certifique-se de estar no diretório raiz do projeto e execute o comando para construir os contêineres:

```bash
docker compose up -d
```

### 4. Acessando a Aplicação

Após a inicialização dos contâineres a aplicação estará disponível em `http://localhost:3000` (ou na porta que você configurou em `.env`).

Você pode ver as rotas em `http://localhost:3000/api-docs`.

### 5. Postman

Dentro da pasta raíz do projeto existe um arquivo `collection.json`, no qual você pode importar para o `Postman` para testar as rotas em um cliente http.

Para testar o `WebSocket`, crie uma nova collection dentro do postman e crie uma nova requisição de tipo `Socket.io`. Insira o endereço `ws://localhost:3000` para se conectar ao WebSocket.
Emita o evento `joinRoom` informando o `chatId` para receber novas mensagens da conversa.
