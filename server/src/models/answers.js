const db = require('../database/db');
const {DataTypes} = require('sequelize');
const Sequelize = require('sequelize')

const User = db.sequelize.define('respostas', {
    fkUser: {
        type: db.Sequelize.INTEGER,
    },
    fkQuestion: {
        type: db.Sequelize.INTEGER
    },
    text: {
        type: db.Sequelize.STRING
    },
    correct: {
        type: db.Sequelize.BOOLEAN
    }
}
, {
    timestamps: false,
    freezeTableName: true,
});
User.sync({ alter: true })
module.exports = User;