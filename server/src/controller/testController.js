const db = require('../database/db');
const User = require('../models/user');
const Test = require('../models/test')
const Class = require('../models/class')
const Question = require('../models/questions')
const Choices = require('../models/choices')
const CS = require('../models/class_students');
const Alternatives = require('../models/choices')
const Answers = require('../models/answers');
const { where } = require('sequelize/dist');


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
            const question = await Question.create({fkTestId: test.dataValues.id, enunciado: q.question, rightChoise: q.correctAnswer, fkAlternatives: choice.dataValues.id})
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
                   // if(p.dataValues.dataComeco <= new Date()) 
                    resp.push(p.dataValues) 
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
           const test = req.query.test
           const email = req.query.email 
           const resp = {}
           const questions_resp = []
           resp.idTest = test.idTest;
           const testeBd = Test.findOne({where: {id: test.idTest}})
           resp.name = testeBd.nome
           let points = 0;
           const quetions_resp = []
           const user = await User.findOne({ where: { email: email }});
           for(const q of test.questions){
            const question =await  Question.findOne({where: {id: q.id}})
            const ans = await Answers.query({fkUser: user.dataValues.id, fkQuestion: q.id, text: q.answer, correct: q.answer === question.dataValues.rightChoise})
            const alt = await Alternatives.findOne({where: {id: question.dataValues.fkAlternatives}})
            const feedback = {} 
            feedback.enunciado = question.dataValues.enunciado;
            feedback.userAnswer = alt.getDataValue(q.answer);
            feedback.correctAnswer = alt.getDataValue(question.dataValues.rightChoise);
            feedback.correct = ans.DataValues.correct;
            points =  ans.dataValues.correct ? points+1 : points
            questions_resp.push(feedback)
           }
           resp.questions = Question
           resp.points = (points/test.question.length) * 10
           res.send({
            data: email,
            statusText: 'Sucesso'
          });
        } catch (error) {
            console.log(error)
        }
    },
    async listaTestTurma(req, res) {
        try{
        const turma = req.query.turma 
        const resp = []
        const testes = Test.findAll({where: {fkTurma: turma}})
        for(const t of testes){
            resp.push(t.dataValues)
        }
        res.send({
            data: resp,
            statusText: 'Sucesso'
        })
    }
    catch (error){
        console.log(error)
    }
    },
    async feedbackProfessor(req, res) {
        const idProva = req.query.idProva 
        const resp = {}
        const questions_resp = []
        const test = Test.findOne({where: {id: idProva}})
        resp.name = test.dataValues.name 
        resp.idProva = test.dataValues.id 
        const questions = Question.findAll({where: {fkTestId: idProva}})
        for(const q of questions){
            let acertos = 0
            const ans = Answers.findAll({where : {fkQuestion: q.dataValues.id}})
            for(const a of ans) {
                acertos =  a.dataValues.correct ? acertos+1 : acertos
            }
            const question = {} 
            question.enunciado = q.dataValues.enunciado
            question.tentativas = ans.length
            question.acertos = acertos
            questions_resp.push(question)
        }
    }
}