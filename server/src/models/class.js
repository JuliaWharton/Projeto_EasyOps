const db = require('../database/db');
const {DataTypes} = require('sequelize');
const Sequelize = require('sequelize')

const User = db.sequelize.define('turma', {
    id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: db.Sequelize.STRING, 
    },
    fkProfessorResponsavel: {
        type: db.Sequelize.INTEGER 
    },
    descricao: {
        type: db.Sequelize.STRING
    }, 
}
, {
    timestamps: false,
    freezeTableName: true,
});
 User.sync({ alter: true })
module.exports = User;