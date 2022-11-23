const db = require('../database/db');
const {DataTypes} = require('sequelize');
const Sequelize = require('sequelize')

const User = db.sequelize.define('alternativas', {
    id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fkProva: {
        type: db.Sequelize.INTEGER 
    },
    texto: {
        type: db.Sequelize.STRING
    },
    ehCerta: {
        type: db.Sequelize.BOOLEAN
    }
}
, {
    timestamps: false,
    freezeTableName: true,
});
await User.sync({ alter: true })
module.exports = User;