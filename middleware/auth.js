const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    // Obter token do header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
    }

    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'sua_chave_secreta');
    
    // Buscar usuário
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'Acesso negado. Usuário não encontrado.' });
    }

    // Adicionar usuário à requisição
    req.user = user;
    next();
  } catch (error) {
    console.error('Erro na autenticação:', error);
    res.status(401).json({ message: 'Acesso negado. Token inválido.' });
  }
}; 