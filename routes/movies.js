const express = require('express');
const router = express.Router();
const { Movie } = require('../models/Movie');
const { Op } = require('sequelize');

// Listar todos os filmes
router.get('/', async (req, res) => {
    try {
        const movies = await Movie.findAll();
        res.json({ movies });
    } catch (error) {
        console.error('Erro ao listar filmes:', error);
        res.status(500).json({ error: 'Erro ao listar filmes' });
    }
});

// Buscar filme por ID
router.get('/:id', async (req, res) => {
    try {
        const movie = await Movie.findByPk(req.params.id);
        if (!movie) {
            return res.status(404).json({ error: 'Filme não encontrado' });
        }
        res.json(movie);
    } catch (error) {
        console.error('Erro ao buscar filme:', error);
        res.status(500).json({ error: 'Erro ao buscar filme' });
    }
});

// Adicionar novo filme
router.post('/', async (req, res) => {
    try {
        const {
            title,
            description,
            releaseYear,
            genre,
            duration,
            rating,
            posterUrl,
            videoUrl,
            isPremium
        } = req.body;

        const movie = await Movie.create({
            title,
            description,
            releaseYear,
            genre: Array.isArray(genre) ? JSON.stringify(genre) : genre,
            duration,
            rating,
            posterUrl,
            videoUrl,
            isPremium
        });

        res.status(201).json(movie);
    } catch (error) {
        console.error('Erro ao adicionar filme:', error);
        res.status(500).json({ error: 'Erro ao adicionar filme' });
    }
});

// Atualizar filme
router.put('/:id', async (req, res) => {
    try {
        const movie = await Movie.findByPk(req.params.id);
        if (!movie) {
            return res.status(404).json({ error: 'Filme não encontrado' });
        }

        const {
            title,
            description,
            releaseYear,
            genre,
            duration,
            rating,
            posterUrl,
            videoUrl,
            isPremium
        } = req.body;

        await movie.update({
            title,
            description,
            releaseYear,
            genre: Array.isArray(genre) ? JSON.stringify(genre) : genre,
            duration,
            rating,
            posterUrl,
            videoUrl,
            isPremium
        });

        res.json(movie);
    } catch (error) {
        console.error('Erro ao atualizar filme:', error);
        res.status(500).json({ error: 'Erro ao atualizar filme' });
    }
});

// Excluir filme
router.delete('/:id', async (req, res) => {
    try {
        const movie = await Movie.findByPk(req.params.id);
        if (!movie) {
            return res.status(404).json({ error: 'Filme não encontrado' });
        }

        await movie.destroy();
        res.json({ message: 'Filme excluído com sucesso' });
    } catch (error) {
        console.error('Erro ao excluir filme:', error);
        res.status(500).json({ error: 'Erro ao excluir filme' });
    }
});

// Buscar filmes em destaque
router.get('/featured', async (req, res) => {
    try {
        const movies = await Movie.findAll({
            where: {
                rating: {
                    [Op.gte]: 8.0
                }
            },
            limit: 5,
            order: [['rating', 'DESC']]
        });
        res.json({ movies });
    } catch (error) {
        console.error('Erro ao buscar filmes em destaque:', error);
        res.status(500).json({ error: 'Erro ao buscar filmes em destaque' });
    }
});

module.exports = router; 