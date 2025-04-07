# Ryzem Cine - Sistema de Streaming

Um sistema de streaming de filmes e séries similar ao Netflix, desenvolvido com React, Node.js e MongoDB.

## Funcionalidades

- Cadastro e login de usuários
- Listagem de filmes e séries
- Interface moderna e responsiva
- Sistema de autenticação com JWT
- Diferenciação entre conteúdo gratuito e premium

## Requisitos

- Node.js (v14 ou superior)
- MongoDB
- NPM ou Yarn

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/ryzem-cine.git
cd ryzem-cine
```

2. Instale as dependências do backend:
```bash
npm install
```

3. Instale as dependências do frontend:
```bash
cd client
npm install
```

4. Crie um arquivo .env na raiz do projeto com as seguintes variáveis:
```
MONGODB_URI=sua_url_do_mongodb
JWT_SECRET=seu_segredo_jwt
PORT=5000
```

## Executando o projeto

1. Inicie o servidor backend:
```bash
npm run dev
```

2. Em outro terminal, inicie o frontend:
```bash
cd client
npm start
```

3. Acesse o sistema em `http://localhost:3000`

## Estrutura do Projeto

```
ryzem-cine/
├── client/                 # Frontend React
│   ├── src/
│   │   ├── components/    # Componentes React
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── models/                # Modelos MongoDB
├── routes/               # Rotas da API
├── middleware/          # Middlewares
├── server.js           # Servidor Express
└── package.json
```

## Tecnologias Utilizadas

- Frontend:
  - React
  - Material-UI
  - Axios
  - React Router

- Backend:
  - Node.js
  - Express
  - MongoDB
  - JWT
  - Bcrypt

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes. 