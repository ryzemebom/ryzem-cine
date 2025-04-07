const express = require('express');
const router = express.Router();
const { Series, Episode } = require('../models/Series');
const { Op } = require('sequelize');

// Listar todas as séries
router.get('/', async (req, res) => {
    try {
        const series = await Series.findAll({
            include: [{
                model: Episode,
                attributes: ['id']
            }]
        });
        res.json({ series });
    } catch (error) {
        console.error('Erro ao listar séries:', error);
        res.status(500).json({ error: 'Erro ao listar séries' });
    }
});

// Buscar série por ID
router.get('/:id', async (req, res) => {
    try {
        const series = await Series.findByPk(req.params.id, {
            include: [{
                model: Episode,
                order: [['seasonNumber', 'ASC'], ['episodeNumber', 'ASC']]
            }]
        });
        if (!series) {
            return res.status(404).json({ error: 'Série não encontrada' });
        }
        res.json(series);
    } catch (error) {
        console.error('Erro ao buscar série:', error);
        res.status(500).json({ error: 'Erro ao buscar série' });
    }
});

// Adicionar nova série
router.post('/', async (req, res) => {
    try {
        const {
            title,
            description,
            releaseYear,
            genre,
            rating,
            posterUrl,
            isPremium
        } = req.body;

        const series = await Series.create({
            title,
            description,
            releaseYear,
            genre: Array.isArray(genre) ? JSON.stringify(genre) : genre,
            rating,
            posterUrl,
            isPremium
        });

        res.status(201).json(series);
    } catch (error) {
        console.error('Erro ao adicionar série:', error);
        res.status(500).json({ error: 'Erro ao adicionar série' });
    }
});

// Atualizar série
router.put('/:id', async (req, res) => {
    try {
        const series = await Series.findByPk(req.params.id);
        if (!series) {
            return res.status(404).json({ error: 'Série não encontrada' });
        }

        const {
            title,
            description,
            releaseYear,
            genre,
            rating,
            posterUrl,
            isPremium
        } = req.body;

        await series.update({
            title,
            description,
            releaseYear,
            genre: Array.isArray(genre) ? JSON.stringify(genre) : genre,
            rating,
            posterUrl,
            isPremium
        });

        res.json(series);
    } catch (error) {
        console.error('Erro ao atualizar série:', error);
        res.status(500).json({ error: 'Erro ao atualizar série' });
    }
});

// Excluir série
router.delete('/:id', async (req, res) => {
    try {
        const series = await Series.findByPk(req.params.id);
        if (!series) {
            return res.status(404).json({ error: 'Série não encontrada' });
        }

        await series.destroy();
        res.json({ message: 'Série excluída com sucesso' });
    } catch (error) {
        console.error('Erro ao excluir série:', error);
        res.status(500).json({ error: 'Erro ao excluir série' });
    }
});

// Adicionar episódio
router.post('/:seriesId/episodes', async (req, res) => {
    try {
        const series = await Series.findByPk(req.params.seriesId);
        if (!series) {
            return res.status(404).json({ error: 'Série não encontrada' });
        }

        const {
            title,
            description,
            duration,
            episodeNumber,
            seasonNumber,
            videoUrl,
            thumbnailUrl
        } = req.body;

        const episode = await Episode.create({
            title,
            description,
            duration,
            episodeNumber,
            seasonNumber,
            videoUrl,
            thumbnailUrl,
            seriesId: series.id
        });

        res.status(201).json(episode);
    } catch (error) {
        console.error('Erro ao adicionar episódio:', error);
        res.status(500).json({ error: 'Erro ao adicionar episódio' });
    }
});

// Atualizar episódio
router.put('/:seriesId/episodes/:episodeId', async (req, res) => {
    try {
        const episode = await Episode.findOne({
            where: {
                id: req.params.episodeId,
                seriesId: req.params.seriesId
            }
        });

        if (!episode) {
            return res.status(404).json({ error: 'Episódio não encontrado' });
        }

        const {
            title,
            description,
            duration,
            episodeNumber,
            seasonNumber,
            videoUrl,
            thumbnailUrl
        } = req.body;

        await episode.update({
            title,
            description,
            duration,
            episodeNumber,
            seasonNumber,
            videoUrl,
            thumbnailUrl
        });

        res.json(episode);
    } catch (error) {
        console.error('Erro ao atualizar episódio:', error);
        res.status(500).json({ error: 'Erro ao atualizar episódio' });
    }
});

// Excluir episódio
router.delete('/:seriesId/episodes/:episodeId', async (req, res) => {
    try {
        const episode = await Episode.findOne({
            where: {
                id: req.params.episodeId,
                seriesId: req.params.seriesId
            }
        });

        if (!episode) {
            return res.status(404).json({ error: 'Episódio não encontrado' });
        }

        await episode.destroy();
        res.json({ message: 'Episódio excluído com sucesso' });
    } catch (error) {
        console.error('Erro ao excluir episódio:', error);
        res.status(500).json({ error: 'Erro ao excluir episódio' });
    }
});

// Buscar séries em destaque
router.get('/featured', async (req, res) => {
    try {
        const series = await Series.findAll({
            where: {
                rating: {
                    [Op.gte]: 8.0
                }
            },
            limit: 5,
            order: [['rating', 'DESC']],
            include: [{
                model: Episode,
                attributes: ['id']
            }]
        });
        res.json({ series });
    } catch (error) {
        console.error('Erro ao buscar séries em destaque:', error);
        res.status(500).json({ error: 'Erro ao buscar séries em destaque' });
    }
});

module.exports = router; 