const db = require('../database/db');
const User = require('../models/user');
const Test = require('../models/test')
const Class = require('../models/class')
const Question = require('../models/questions')
const Choices = require('../models/choices')
const CS = require('../models/class_students')


module.exports = {
    async createTest(req, res){
        try{ 
        const nome = req.body.prova 
        const test = await Test.create({nome: prova.nome, horarioComeco: prova.comeco, duracao: prova.duracao, descricao: prova.descricao, fkTurma: prova.turma})
        if(!test) 
        res.send({
            statusText: "Failed",
            status: 500
        })
        for(question of prova.questions){
            if(closedQuestion){ 
                const choice = await Choices.create(question.alternatives) 
                if(!choice)
                    res.send({
                        statusText: "Failed",
                        status: 500
                    })
                }
            const question = await Question.create({closedQuestion: question.closedQuestion, fkTestId: test.dataValues.id, enunciado: question.enunciado, rightChoise: question.rightChoise, fkAlternatives: question.closedQuestion ? choice : null })
            if(!question)
                res.send({
                    statusText: "Failed",
                    status: 500
                })  
        }
        } catch (error) {
            res.send({
                statusText: "Failed",
                status: 500
            })
        }
    }, 
    async listTestsForUser(req, res){
        try {
            const email = req.body.email 
            resp = []
            const user = await User.findOne({where: {email: email}})
            if(!user)
            res.send({
                statusText: "Failed",
                status: 500
            })
            const CSs = await CS.findAll({where: {fkUserId: user.dataValues.id}})
            if(!CSs)
            res.send({
                statusText: "Failed",
                status: 500
            })
            for(const cs of CSs){
                const classe = await Class.findOne({where: {id: cs.dataValues.fkTurma}})
                if(!classe) res.send({
                    statusText: "Failed",
                    status: 500
                })
                const provas = await Test.findAll({where: {fkTurma: classe.dataValues.id}})
                if(!provas) res.send({
                    statusText: "Failed",
                    status: 500
                })
                for(const p of provas)
                    if(p.dataValues.dataComeco < new Date()) resp.push(p.dataValues.nome) 
            }
            res.send({
                statusText: 'Sucesso', 
                data: resp
            })
        } catch (error) {
            res.send({
                statusText: "Failed",
                status: 500
            })
        }
    }
}