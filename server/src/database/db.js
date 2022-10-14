const Sequelize = require('sequelize')
const dbConfig = require('../config/database');

// Conexão com banco de dados
const sequelize = new Sequelize(dbConfig);

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}