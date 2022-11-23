const db = require('../database/db');
const {DataTypes} = require('sequelize');
const Sequelize = require('sequelize')

const User = db.sequelize.define('questoes', {
    id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tipo: {
        type: db.Sequelize.INTEGER, 
    },
    fkProfessorResponsavel: {
        type: db.Sequelize.INTEGER 
    },
    enunciado: {
        type: db.Sequelize.STRING
    }
}
, {
    timestamps: false,
    freezeTableName: true,
});
module.exports = User;