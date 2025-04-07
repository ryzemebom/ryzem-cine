const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  subscription: {
    type: DataTypes.ENUM('free', 'premium'),
    defaultValue: 'free'
  },
  watchlist: {
    type: DataTypes.TEXT,
    defaultValue: '[]',
    get() {
      const rawValue = this.getDataValue('watchlist');
      return JSON.parse(rawValue);
    },
    set(value) {
      this.setDataValue('watchlist', JSON.stringify(value));
    }
  }
}, {
  timestamps: true
});

module.exports = User; 