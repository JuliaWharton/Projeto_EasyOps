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
    async createTest(req, res){
        try{ 
        const prova = req.body.prova 
        const test = await Test.create({nome: prova.name, horarioComeco: prova.initialDate, duracao: prova.time, fkTurma: prova.class})
        if(!test) {
            res.send({
                statusText: "Failed",
                status: 500
            })
            return 
        }
        for(const q of prova.questions){
            const choice = await Choices.create(q.alternatives) 
            if(!choice) {
                res.send({
                    statusText: "Failed",
                    status: 500
                })
                return
            }
            const question = await Question.create({fkTestId: test.dataValues.id, enunciado: q.question, rightChoise: q.correctAnswer, fkAlternatives: choice })
            if(!question){
                res.send({
                    statusText: "Failed",
                    status: 500
                });
                return
            }
        }
        res.send({
            statusText: 'sucesso'
        })
        } catch (error) {
            console.log(error)
        }
    }, 
    async listTestsForUser(req, res){
        try {
            const email = req.query.email 
            const resp = []
            const user = await User.findOne({where: {email: email}})
            if(!user){
            res.send({
                statusText: "Failed",
                status: 500
            });
            return
        }
            const CSs = await CS.findAll({where: {fkUser: user.dataValues.id}});
            if(!CSs){
            res.send({
                statusText: "Failed",
                status: 500
            });
            return;
        }
            for(const cs of CSs){
                const classe = await Class.findOne({where: {id: cs.dataValues.fkTurma}});
                if(!classe) {
                    res.send({
                    statusText: "Failed",
                    status: 500
                });
                return;
            }
                const provas = await Test.findAll({where: {fkTurma: classe.dataValues.id}});
                if(!provas) {
                    res.send({
                    statusText: "Failed",
                    status: 500
                });
                return;
            }
                for(const p of provas)
                    if(p.dataValues.dataComeco < new Date()) resp.push(p.dataValues) 
            }
            res.send({
                statusText: 'Sucesso', 
                data: resp
            })
        } catch (error) {
            console.log(error)
        }
    }, 
    async loadTest(req, res) {
        try {
        const provaId = req.query.id 
        const resp = {}
        const questions_resp = []
        const prova = await Test.findOne({where: {id: provaId}})
        if(!prova) {
            res.send({
            statusText: "Failed",
            status: 500
            })
            return;
        }
        const questions = await Question.findAll({where: {fkTestId: prova.dataValues.id}})
        if(!questions){
            res.send({
                statusText: "Failed",
                status: 500
            })
            return;
        }
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
        console.log(error)
    }
}, 

    async endTest(req, res) {
        try {
           const questions = req.query.questions
           const email = req.query.email 
           const resp = []
           const user = await User.findOne({ where: { email: email }});
           for(const q of questions){
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
            console.log(error)
        }
    },
}