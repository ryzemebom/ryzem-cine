const router = require('express').Router();
const Movie = require('../models/Movie');
const auth = require('../middleware/auth');

// Listar todos os filmes
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).send('Erro no servidor');
  }
});

// Obter filme por ID
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Filme não encontrado' });
    }
    res.json(movie);
  } catch (err) {
    res.status(500).send('Erro no servidor');
  }
});

// Adicionar filme (apenas admin)
router.post('/', auth, async (req, res) => {
  try {
    const newMovie = new Movie(req.body);
    const savedMovie = await newMovie.save();
    res.json(savedMovie);
  } catch (err) {
    res.status(500).send('Erro no servidor');
  }
});

// Atualizar filme (apenas admin)
router.put('/:id', auth, async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!movie) {
      return res.status(404).json({ message: 'Filme não encontrado' });
    }
    res.json(movie);
  } catch (err) {
    res.status(500).send('Erro no servidor');
  }
});

// Deletar filme (apenas admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Filme não encontrado' });
    }
    res.json({ message: 'Filme removido com sucesso' });
  } catch (err) {
    res.status(500).send('Erro no servidor');
  }
});

module.exports = router; 