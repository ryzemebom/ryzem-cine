const { Sequelize } = require('sequelize');
const path = require('path');

// Configuração do banco de dados
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.NODE_ENV === 'production' 
    ? ':memory:' // Usar banco em memória no Vercel
    : path.join(__dirname, '../database.sqlite'),
  logging: false
});

// Testar conexão
sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  })
  .catch(err => {
    console.error('Erro ao conectar com o banco de dados:', err);
  });

module.exports = sequelize; 