# Ryzem Cine - Plataforma de Streaming

Uma plataforma de streaming de filmes e séries desenvolvida com Node.js, Express e SQLite.

## 🚀 Funcionalidades

- Autenticação de usuários (registro/login)
- Listagem de filmes e séries
- Detalhes de filmes e séries
- Sistema de assinatura (gratuito/premium)
- Lista de favoritos
- Player de vídeo integrado

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- NPM (gerenciador de pacotes do Node)

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/ryzem-cine.git
cd ryzem-cine
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
Crie um arquivo `.env` na raiz do projeto com:
```
PORT=3000
JWT_SECRET=sua_chave_secreta
```

4. Inicie o servidor:
```bash
npm start
```

## 🌐 Acesso

- Frontend: http://localhost:3000
- API: http://localhost:3000/api

## 📁 Estrutura do Projeto

```
ryzem-cine/
├── config/             # Configurações do banco de dados
├── middleware/         # Middlewares (autenticação, etc)
├── models/            # Modelos do banco de dados
├── pages/             # Páginas HTML do frontend
├── routes/            # Rotas da API
├── .env              # Variáveis de ambiente
├── package.json      # Dependências e scripts
└── server.js         # Arquivo principal do servidor
```

## 🔐 Rotas da API

### Autenticação
- POST /api/auth/register - Registro de usuário
- POST /api/auth/login - Login de usuário

### Filmes
- GET /api/movies - Lista todos os filmes
- GET /api/movies/:id - Obtém detalhes de um filme
- POST /api/movies - Cria um novo filme (admin)
- PUT /api/movies/:id - Atualiza um filme (admin)
- DELETE /api/movies/:id - Remove um filme (admin)

### Séries
- GET /api/series - Lista todas as séries
- GET /api/series/:id - Obtém detalhes de uma série
- POST /api/series - Cria uma nova série (admin)
- PUT /api/series/:id - Atualiza uma série (admin)
- DELETE /api/series/:id - Remove uma série (admin)
- POST /api/series/:id/episodes - Adiciona um episódio (admin)

## 👥 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes. 