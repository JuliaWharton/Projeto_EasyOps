const db = require('../database/db');
const {DataTypes} = require('sequelize');
const Sequelize = require('sequelize')

const User = db.sequelize.define('prova', {
    id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: db.Sequelize.STRING, 
    },
    horarioComeco:{
        type: db.Sequelize.DATE
    },
    duracao: {
        type: db.Sequelize.BIGINT
    },
    descricao: {
        type: db.Sequelize.STRING
    }, 
    fkTurma: {
        type: db.Sequelize.INTEGER
    }
}
, {
    timestamps: false,
    freezeTableName: true,
});
User.sync({ alter: true })
module.exports = User;