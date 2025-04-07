const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Modelo para Episódios
const Episode = sequelize.define('Episode', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  episodeNumber: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  seasonNumber: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  videoUrl: {
    type: DataTypes.STRING,
    allowNull: false
  },
  thumbnailUrl: {
    type: DataTypes.STRING
  }
}, {
  timestamps: true
});

// Modelo para Séries
const Series = sequelize.define('Series', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  releaseYear: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  genre: {
    type: DataTypes.TEXT,
    allowNull: false,
    get() {
      const rawValue = this.getDataValue('genre');
      return JSON.parse(rawValue);
    },
    set(value) {
      this.setDataValue('genre', JSON.stringify(value));
    }
  },
  rating: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  },
  posterUrl: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isPremium: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  timestamps: true
});

// Definir relacionamento entre Series e Episode
Series.hasMany(Episode, { foreignKey: 'seriesId' });
Episode.belongsTo(Series, { foreignKey: 'seriesId' });

module.exports = { Series, Episode }; 