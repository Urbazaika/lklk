const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const User = sequelize.define('User', {
name: { type: DataTypes.STRING, allowNull: false },
email: { type: DataTypes.STRING, allowNull: false, unique: true }, 
isActive: { type: DataTypes.BOOLEAN, defaultValue: true }, 
});
module.exports = User;