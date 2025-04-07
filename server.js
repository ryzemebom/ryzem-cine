const express = require('express');
const cors = require('cors');
const path = require('path');
const sequelize = require('./config/database');

// Importar modelos
const User = require('./models/User');
const Movie = require('./models/Movie');
const { Series, Episode } = require('./models/Series');

// Importar rotas
const authRoutes = require('./routes/auth');
const movieRoutes = require('./routes/movies');
const seriesRoutes = require('./routes/series');

const app = express();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'pages')));
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'client', 'public')));

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/series', seriesRoutes);

// Endpoint de verificação de saúde
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Servidor funcionando corretamente' });
});

// Endpoint para verificar filmes
app.get('/check-movies', async (req, res) => {
  try {
    const movies = await Movie.findAll();
    res.status(200).json({ 
      status: 'ok', 
      count: movies.length,
      movies: movies.map(movie => ({
        id: movie.id,
        title: movie.title,
        genre: movie.genre
      }))
    });
  } catch (error) {
    console.error('Erro ao verificar filmes:', error);
    res.status(500).json({ status: 'error', message: 'Erro ao verificar filmes' });
  }
});

// Endpoint para verificar séries
app.get('/check-series', async (req, res) => {
  try {
    const series = await Series.findAll();
    res.status(200).json({ 
      status: 'ok', 
      count: series.length,
      series: series.map(serie => ({
        id: serie.id,
        title: serie.title,
        genre: serie.genre
      }))
    });
  } catch (error) {
    console.error('Erro ao verificar séries:', error);
    res.status(500).json({ status: 'error', message: 'Erro ao verificar séries' });
  }
});

// Rota para servir o frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'index.html'));
});

app.get('/movies', (req, res) => {
  console.log('Servindo página de filmes...');
  res.sendFile(path.join(__dirname, 'pages', 'movies.html'));
});

app.get('/series', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'series.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'login.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'register.html'));
});

app.get('/forgot-password', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'forgot-password.html'));
});

app.get('/reset-password', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'reset-password.html'));
});

app.get('/profile', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'profile.html'));
});

app.get('/watchlist', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'watchlist.html'));
});

app.get('/movie-details', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'movie-details.html'));
});

app.get('/series-details', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'series-details.html'));
});

app.get('/admin.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'admin.html'));
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error('Erro:', err);
  res.status(500).json({ message: 'Erro interno do servidor' });
});

// Sincronizar modelos com o banco de dados e criar dados de teste
sequelize.sync({ force: true })
  .then(async () => {
    console.log('Modelos sincronizados com o banco de dados.');
    
    // Criar filmes de teste
    try {
      await Movie.bulkCreate([
        {
          title: 'O Senhor dos Anéis: A Sociedade do Anel',
          description: 'Um hobbit recebe um anel mágico e deve destruí-lo antes que caia nas mãos do mal.',
          releaseYear: 2001,
          genre: JSON.stringify(['Aventura', 'Fantasia']),
          duration: 178,
          rating: 8.8,
          posterUrl: 'https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_.jpg',
          videoUrl: 'https://example.com/video1.mp4',
          isPremium: false
        },
        {
          title: 'Matrix',
          description: 'Um programador descobre que o mundo em que vive é uma simulação criada por máquinas.',
          releaseYear: 1999,
          genre: JSON.stringify(['Ação', 'Ficção Científica']),
          duration: 136,
          rating: 8.7,
          posterUrl: 'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg',
          videoUrl: 'https://example.com/video2.mp4',
          isPremium: false
        },
        {
          title: 'Interestelar',
          description: 'Uma equipe de exploradores viaja através de um buraco de minhoca em busca de um novo lar para a humanidade.',
          releaseYear: 2014,
          genre: JSON.stringify(['Aventura', 'Drama', 'Ficção Científica']),
          duration: 169,
          rating: 8.6,
          posterUrl: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg',
          videoUrl: 'https://example.com/video3.mp4',
          isPremium: true
        }
      ]);
      console.log('Filmes de teste criados com sucesso.');

      // Criar séries de teste
      const series = await Series.create({
        title: 'Stranger Things',
        description: 'Quando um garoto desaparece, uma pequena cidade descobre um mistério envolvendo experimentos secretos, forças sobrenaturais e uma garotinha muito estranha.',
        releaseYear: 2016,
        genre: JSON.stringify(['Drama', 'Fantasia', 'Terror']),
        rating: 8.7,
        posterUrl: 'https://m.media-amazon.com/images/M/MV5BN2ZmYjg1YmItNWQ4OC00YWM0LWE0ZDktYThjOTZiZjhhN2Q2XkEyXkFqcGdeQXVyNjgxNTQ3Mjk@._V1_.jpg',
        isPremium: false
      });

      await Episode.bulkCreate([
        {
          title: 'Capítulo Um: O Desaparecimento de Will Byers',
          description: 'Will Byers desaparece misteriosamente. A xerife Hopper inicia uma investigação. Os amigos de Will encontram uma garota estranha.',
          duration: 48,
          episodeNumber: 1,
          seasonNumber: 1,
          videoUrl: 'https://example.com/st-s01e01.mp4',
          thumbnailUrl: 'https://example.com/st-s01e01-thumb.jpg',
          seriesId: series.id
        },
        {
          title: 'Capítulo Dois: A Estranha na Rua Maple',
          description: 'Lucas, Mike e Dustin tentam falar com a garota que encontraram. Joyce recebe uma ligação estranha.',
          duration: 55,
          episodeNumber: 2,
          seasonNumber: 1,
          videoUrl: 'https://example.com/st-s01e02.mp4',
          thumbnailUrl: 'https://example.com/st-s01e02-thumb.jpg',
          seriesId: series.id
        }
      ]);

      const breakingBad = await Series.create({
        title: 'Breaking Bad',
        description: 'Um professor de química do ensino médio com câncer terminal se junta a um ex-aluno para produzir e vender metanfetamina.',
        releaseYear: 2008,
        genre: JSON.stringify(['Crime', 'Drama', 'Suspense']),
        rating: 9.5,
        posterUrl: 'https://m.media-amazon.com/images/M/MV5BYmQ4YWMxYjUtNjZmYi00MDQ1LWFjMjMtNjA5ZDdiYjdiODU5XkEyXkFqcGdeQXVyMTMzNDExODE5._V1_.jpg',
        isPremium: true
      });

      await Episode.bulkCreate([
        {
          title: 'Piloto',
          description: 'Um professor de química recebe um diagnóstico terminal e decide entrar para o mundo do crime para garantir o futuro de sua família.',
          duration: 58,
          episodeNumber: 1,
          seasonNumber: 1,
          videoUrl: 'https://example.com/bb-s01e01.mp4',
          thumbnailUrl: 'https://example.com/bb-s01e01-thumb.jpg',
          seriesId: breakingBad.id
        },
        {
          title: 'O Gato Está no Saco',
          description: 'Walt e Jesse tentam se livrar de dois corpos, mas as coisas não saem como planejado.',
          duration: 48,
          episodeNumber: 2,
          seasonNumber: 1,
          videoUrl: 'https://example.com/bb-s01e02.mp4',
          thumbnailUrl: 'https://example.com/bb-s01e02-thumb.jpg',
          seriesId: breakingBad.id
        }
      ]);

      console.log('Séries de teste criadas com sucesso.');
    } catch (error) {
      console.error('Erro ao criar dados de teste:', error);
    }
    
    // Iniciar servidor
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
      console.log('Endpoints disponíveis:');
      console.log('- GET /health - Verificação de saúde do servidor');
      console.log('- GET /check-movies - Verificação de filmes');
      console.log('- GET /check-series - Verificação de séries');
      console.log('- GET / - Página inicial');
      console.log('- GET /movies - Página de filmes');
      console.log('- GET /series - Página de séries');
    });
  })
  .catch(err => {
    console.error('Erro ao sincronizar modelos:', err);
    process.exit(1);
  });

// Exportar o app para o Vercel
module.exports = app; 