const db = require('../database/db');
const User = require('../models/user');
const Class = require('../models/class')

module.exports = {
    async createClass(req, res) {
        const email = req.body.email
        const nome = req.body.nome 
        const desc = req.body.desc 
        
    }
}