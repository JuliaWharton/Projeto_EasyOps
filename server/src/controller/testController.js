const db = require('../database/db');
const User = require('../models/user');
const Test = require('../models/test')
const Class = require('../models/class')
const Question = require('../models/questions')

module.exports = {
    async createTest(req, res){
        try{ 
        const nome = req.body.nome 
        const email = req.body.email 
        const comeco = req.body.comeco 
        const duracao = req.body.duracao 
        const descricao = req.vody.descricao 
        const turma = req.body.turma 
        const user = await User.findOne({where: {email: email}})
        const test = await Test.create({nome: nome, fkProfesorResponsavel: user.dataValues.id, horarioComeco: comeco, duracao: duracao, descricao: descricao, fkTurma: turma})
        if(test) 
        res.send({
            statusText: 'Sucesso', 
            data: test.dataValues.nome
        })
        res.send({
            statusText: "Failed",
            status: 500
        })

        } catch (error) {
            res.send({
                statusText: "Failed",
                status: 500
            })
        }
    }, 
    async creteQuestionToTest(req, res) {
        const enunciado = req.body.enunciado
        const closedQuestion = req.body.closedQuestion 
        const 
    }
}