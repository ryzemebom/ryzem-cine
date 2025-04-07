const express = require('express');
const router = express.Router();
const { Series, Episode } = require('../models/Series');
const auth = require('../middleware/auth');
const { Op } = require('sequelize');

// Listar todas as séries com paginação e filtros
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 12; // Séries por página
    const offset = (page - 1) * limit;
    
    // Construir condições de filtro
    const where = {};
    
    if (req.query.search) {
      where.title = {
        [Op.like]: `%${req.query.search}%`
      };
    }
    
    if (req.query.genre) {
      where.genre = {
        [Op.like]: `%${req.query.genre}%`
      };
    }
    
    if (req.query.year) {
      where.releaseYear = req.query.year;
    }

    // Buscar séries com paginação e filtros
    const { count, rows: series } = await Series.findAndCountAll({
      where,
      limit,
      offset,
      order: [['createdAt', 'DESC']],
      include: [{
        model: Episode,
        attributes: ['id', 'title', 'episodeNumber', 'seasonNumber']
      }]
    });

    // Calcular total de páginas
    const totalPages = Math.ceil(count / limit);

    res.json({
      series,
      currentPage: page,
      totalPages,
      totalSeries: count
    });
  } catch (error) {
    console.error('Erro ao listar séries:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

// Obter séries em destaque
router.get('/featured', async (req, res) => {
  try {
    const series = await Series.findAll({
      order: [['rating', 'DESC']],
      limit: 8,
      include: [{
        model: Episode,
        attributes: ['id', 'title', 'episodeNumber', 'seasonNumber']
      }]
    });
    res.json(series);
  } catch (error) {
    console.error('Erro ao listar séries em destaque:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

// Obter série por ID
router.get('/:id', async (req, res) => {
  try {
    const series = await Series.findByPk(req.params.id, {
      include: [{
        model: Episode,
        attributes: ['id', 'title', 'description', 'duration', 'episodeNumber', 'seasonNumber', 'videoUrl', 'thumbnailUrl']
      }]
    });
    
    if (!series) {
      return res.status(404).json({ message: 'Série não encontrada' });
    }
    
    res.json(series);
  } catch (error) {
    console.error('Erro ao obter série:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

// Criar nova série (apenas admin)
router.post('/', auth, async (req, res) => {
  try {
    const series = await Series.create(req.body);
    res.status(201).json(series);
  } catch (error) {
    console.error('Erro ao criar série:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

// Atualizar série (apenas admin)
router.put('/:id', auth, async (req, res) => {
  try {
    const series = await Series.findByPk(req.params.id);
    if (!series) {
      return res.status(404).json({ message: 'Série não encontrada' });
    }
    await series.update(req.body);
    res.json(series);
  } catch (error) {
    console.error('Erro ao atualizar série:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

// Deletar série (apenas admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    const series = await Series.findByPk(req.params.id);
    if (!series) {
      return res.status(404).json({ message: 'Série não encontrada' });
    }
    await series.destroy();
    res.json({ message: 'Série removida com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar série:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

// Adicionar episódio a uma série (apenas admin)
router.post('/:id/episodes', auth, async (req, res) => {
  try {
    const series = await Series.findByPk(req.params.id);
    if (!series) {
      return res.status(404).json({ message: 'Série não encontrada' });
    }
    
    const episode = await Episode.create({
      ...req.body,
      seriesId: series.id
    });
    
    res.status(201).json(episode);
  } catch (error) {
    console.error('Erro ao adicionar episódio:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

// Atualizar episódio (apenas admin)
router.put('/:seriesId/episodes/:episodeId', auth, async (req, res) => {
  try {
    const episode = await Episode.findOne({
      where: {
        id: req.params.episodeId,
        seriesId: req.params.seriesId
      }
    });

    if (!episode) {
      return res.status(404).json({ message: 'Episódio não encontrado' });
    }

    await episode.update(req.body);
    res.json(episode);
  } catch (error) {
    console.error('Erro ao atualizar episódio:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

// Deletar episódio (apenas admin)
router.delete('/:seriesId/episodes/:episodeId', auth, async (req, res) => {
  try {
    const episode = await Episode.findOne({
      where: {
        id: req.params.episodeId,
        seriesId: req.params.seriesId
      }
    });

    if (!episode) {
      return res.status(404).json({ message: 'Episódio não encontrado' });
    }

    await episode.destroy();
    res.json({ message: 'Episódio removido com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar episódio:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

module.exports = router; 