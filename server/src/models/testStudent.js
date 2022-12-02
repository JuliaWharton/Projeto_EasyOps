const db = require('../database/db');
const {DataTypes} = require('sequelize');
const Sequelize = require('sequelize')

const User = db.sequelize.define('prova_alunos', {
    id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fkTest: {
        type: db.Sequelize.INTEGER
    },
    fkUser: {
        type: db.Sequelize.INTEGER
    }, 
    grade: {
        type: db.Sequelize.INTEGER
    }, 
}
, {
    timestamps: false,
    freezeTableName: true,
});
User.sync({ alter: true })
module.exports = User;