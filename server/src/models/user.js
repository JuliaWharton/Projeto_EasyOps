const db = require('../database/db');
const {DataTypes} = require('sequelize');
const Sequelize = require('sequelize')

const User = db.sequelize.define('usuarios', {
    email: {
        type: db.Sequelize.STRING,
        primaryKey: true
    },
    nusp: {
        type: db.Sequelize.STRING, 
        primaryKey: true
    },
    senha: {
        type: db.Sequelize.STRING
    },
   cpf: {
        type: db.Sequelize.STRING
    },
    Professor: {
        type: db.Sequelize.INTEGER
    },
}
, {
    timestamps: false,
    freezeTableName: true,
});
module.exports = User;