const db = require('../database/db');
const {DataTypes} = require('sequelize');
const Sequelize = require('sequelize')

const User = db.sequelize.define('turma_alunos', {
    id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fkTurma: {
        type: db.Sequelize.INTEGER
    },
    fkUser: {
        type: db.Sequelize.INTEGER
    }
}
, {
    timestamps: false,
    freezeTableName: true,
});
User.sync({ alter: true })
module.exports = User;