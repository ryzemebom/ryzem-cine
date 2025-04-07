const router = require('express').Router();
const Series = require('../models/Series');
const auth = require('../middleware/auth');

// Listar todas as séries
router.get('/', async (req, res) => {
  try {
    const series = await Series.find();
    res.json(series);
  } catch (err) {
    res.status(500).send('Erro no servidor');
  }
});

// Obter série por ID
router.get('/:id', async (req, res) => {
  try {
    const series = await Series.findById(req.params.id);
    if (!series) {
      return res.status(404).json({ message: 'Série não encontrada' });
    }
    res.json(series);
  } catch (err) {
    res.status(500).send('Erro no servidor');
  }
});

// Adicionar série (apenas admin)
router.post('/', auth, async (req, res) => {
  try {
    const newSeries = new Series(req.body);
    const savedSeries = await newSeries.save();
    res.json(savedSeries);
  } catch (err) {
    res.status(500).send('Erro no servidor');
  }
});

// Atualizar série (apenas admin)
router.put('/:id', auth, async (req, res) => {
  try {
    const series = await Series.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!series) {
      return res.status(404).json({ message: 'Série não encontrada' });
    }
    res.json(series);
  } catch (err) {
    res.status(500).send('Erro no servidor');
  }
});

// Deletar série (apenas admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    const series = await Series.findByIdAndDelete(req.params.id);
    if (!series) {
      return res.status(404).json({ message: 'Série não encontrada' });
    }
    res.json({ message: 'Série removida com sucesso' });
  } catch (err) {
    res.status(500).send('Erro no servidor');
  }
});

// Adicionar episódio a uma série (apenas admin)
router.post('/:id/episodes', auth, async (req, res) => {
  try {
    const series = await Series.findById(req.params.id);
    if (!series) {
      return res.status(404).json({ message: 'Série não encontrada' });
    }

    const { seasonNumber, episode } = req.body;
    let season = series.seasons.find(s => s.seasonNumber === seasonNumber);

    if (!season) {
      season = { seasonNumber, episodes: [] };
      series.seasons.push(season);
    }

    season.episodes.push(episode);
    await series.save();
    res.json(series);
  } catch (err) {
    res.status(500).send('Erro no servidor');
  }
});

module.exports = router; 