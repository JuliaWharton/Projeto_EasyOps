const db = require('../database/db');
const User = require('../models/user');
const Test = require('../models/test')
const Class = require('../models/class')
const Question = require('../models/questions')
const Choices = require('../models/choices')
const CS = require('../models/class_students');
const Alternatives = require('../models/choices')
const Answers = require('../models/answers')


module.exports = {
    async queryTest(req, res){
        try{ 
        const prova = req.body.prova 
        const test = await Test.query({nome: prova.nome, horarioComeco: prova.comeco, duracao: prova.duracao, descricao: prova.descricao, fkTurma: prova.turma})
        if(!test) 
        res.send({
            statusText: "Failed",
            status: 500
        })
        for(question of prova.questions){
            const choice = await Choices.query(question.alternatives) 
            if(!choice)
                res.send({
                    statusText: "Failed",
                    status: 500
                })
            const question = await Question.query({fkTestId: test.dataValues.id, enunciado: question.enunciado, rightChoise: question.rightChoise, fkAlternatives: choice })
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
            const resp = []
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
    }, 
    async loadTest(req, res) {
        try {
        const nome = req.body.nome 
        const resp = {}
        const questions_resp = []
        const prova = await Test.findOne({where: {nome: nome}})
        if(!prova) res.send({
            statusText: "Failed",
            status: 500
        })
        const questions = await Question.findAll({where: {fkTestId: prova.dataValues.id}})
        if(!questions)
        res.send({
            statusText: "Failed",
            status: 500
        })
        for(const q of questions){
           const alternatives = await Alternatives.findOne({where: {id: q.dataValues.fkAlternatives}}) 
           const que = {}
           que.id = q.dataValues.id 
           que.question = q.dataValues.enunciado;
           que.alternatives = alternatives.dataValues
           questions_resp.push(que)
        }
        resp.idProva = prova.dataValues.id 
        resp.time = prova.dataValues.duracao 
        resp.questions = questions_resp
        res.send({
            statusText: 'Sucesso', 
            data: resp
        })
    }
    catch (erro) {
        res.send({
            statusText: "Failed",
            status: 500
        })
    }
}, 

    async endTest(req, res) {
        try {
           const questions = req.body.questions
           const email = req.body.email 
           const resp = []
           const user = await User.findOne({ where: { email: email }});
           for(q of questions){
            const question =await  Question.findOne({where: {id: q.id}})
            const ans = await Answers.query({fkUser: user.dataValues.id, fkQuestion: q.id, text: q.answer, correct: q.answer === question.dataValues.rightChoise})
            const alt = await Alternatives.findOne({where: {id: question.dataValues.fkAlternatives}})
            const feedback = {} 
            feedback.enunciado = question.dataValues.enunciado;
            feedback.userAnswer = alt.getDataValue(q.answer);
            feedback.correctAnswer = alt.getDataValue(question.dataValues.rightChoise);
            feedback.correct = ans.DataValues.correct;
            resp.push(feedback)
           }
           res.send({
            data: email,
            statusText: 'Sucesso'
          });
        } catch (error) {
            res.send({
                statusText: "Failed",
                status: 500
            })
        }
    },
}