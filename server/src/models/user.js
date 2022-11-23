const db = require('../database/db');
const {DataTypes} = require('sequelize');
const Sequelize = require('sequelize')

const User = db.sequelize.define('usuarios', {
    id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    },
    email: {
        type: db.Sequelize.STRING
    },
    nusp: {
        type: db.Sequelize.STRING
    },
    senha: {
        type: db.Sequelize.STRING
    },
   cpf: {
        type: db.Sequelize.STRING
    },
    tipo: {
        type: db.Sequelize.INTEGER
    }
}
, {
    timestamps: false,
    freezeTableName: true,
});
module.exports = User;