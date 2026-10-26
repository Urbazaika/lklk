const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Author = sequelize.define('Author', {
  firstname: { type: DataTypes.STRING, allowNull: false },
  lastname: { type: DataTypes.STRING, allowNull: false },
  country: { type: DataTypes.STRING },
});

module.exports = Author;