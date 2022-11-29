const db = require('../database/db');
const {DataTypes} = require('sequelize');
const Sequelize = require('sequelize')

const User = db.sequelize.define('questoes', {
    id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    closedQuestion: {
        type: db.Sequelize.INTEGER, 
    },
    fkTestId: {
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
User.sync({ alter: true })
module.exports = User;