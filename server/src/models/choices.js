const db = require('../database/db');
const {DataTypes} = require('sequelize');
const Sequelize = require('sequelize')

const User = db.sequelize.define('alternativas', {
    id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    a: {
        type: db.Sequelize.STRING
    }, 
    b: {
        type: db.Sequelize.STRING
    }, 
    c: {
        type: db.Sequelize.STRING
    }, 
    d: {
        type: db.Sequelize.STRING
    }, 
    e: {
        type: db.Sequelize.STRING
    }, 
}
, {
    timestamps: false,
    freezeTableName: true,
});
User.sync({ alter: true })
module.exports = User;