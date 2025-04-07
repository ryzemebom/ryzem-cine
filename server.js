const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conexão com o MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ryzem-cine', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Conectado ao MongoDB'))
.catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Rotas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/movies', require('./routes/movies'));
app.use('/api/series', require('./routes/series'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
}); 