const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const auth = require('../middleware/auth');

// Listar todos os filmes
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.findAll();
    res.json(movies);
  } catch (error) {
    console.error('Erro ao listar filmes:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

// Obter filme por ID
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Filme não encontrado' });
    }
    res.json(movie);
  } catch (error) {
    console.error('Erro ao obter filme:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

// Criar novo filme (apenas admin)
router.post('/', auth, async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json(movie);
  } catch (error) {
    console.error('Erro ao criar filme:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

// Atualizar filme (apenas admin)
router.put('/:id', auth, async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Filme não encontrado' });
    }
    await movie.update(req.body);
    res.json(movie);
  } catch (error) {
    console.error('Erro ao atualizar filme:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

// Deletar filme (apenas admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Filme não encontrado' });
    }
    await movie.destroy();
    res.json({ message: 'Filme removido com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar filme:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

module.exports = router; 