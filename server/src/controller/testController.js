const db = require('../database/db');
const User = require('../models/user');
const Test = require('../models/test')
const Class = require('../models/class')
const Question = require('../models/questions')
const CS = require('../models/class_students');
const Alternatives = require('../models/choices')
const Answers = require('../models/answers');
const TS = require('../models/testStudent');
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
            const choice = await Alternatives.create(q.alternatives) 
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
                statusText: "Nenhum teste pra carregar",
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
                if(!provas) continue;
                for(const p of provas)
                    //if(p.dataValues.dataComeco <= new Date()) 
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
           if(!alternatives){
            res.send({
                statusText: "Failed",
                status: 500
            })
            return
           }
           const que = {}
           que.id = q.dataValues.id 
           que.question = q.dataValues.enunciado;
           que.alternatives = alternatives.dataValues
           questions_resp.push(que)
        }
        resp.idProva = prova.dataValues.id 
        resp.time = prova.dataValues.duracao 
        resp.name = prova.dataValues.nome
        resp.questions = questions_resp
        res.send({
            statusText: 'Sucesso', 
            data: resp
        })
    }
    catch (error) {
        console.log(error)
    }
}, 

    async endTest(req, res) {
        try {
           const questions = req.query.questions
           const email = req.query.email
           const idTest = req.query.id 
           const resp = {}
           const questions_resp = []
           resp.idTest = test.idTest;
           const testeBd =  await Test.findOne({where: {id: idTest}})
           if(!testeBd){
            res.send({
                statusText: "Failed",
                status: 500
            })
            return;
           }
           resp.name = testeBd.nome
           let points = 0;
           const quetions_resp = []
           const user = await User.findOne({ where: { email: email }});
           if(!user){
            res.send({
                statusText: "Failed",
                status: 500
            })
            return; 
           }
           for(const q of questions){
            const question =await Question.findOne({where: {id: q.id}})
            if(!question){
                res.send({
                    statusText: "Failed",
                    status: 500
                })
                return;
            }
            const ans = await Answers.create({fkUser: user.dataValues.id, fkQuestion: q.id, text: q.answer, correct: q.answer === question.dataValues.rightChoise})
            const alt = await Alternatives.findOne({where: {id: question.dataValues.fkAlternatives}})
            if(!alt){
                res.send({
                    statusText: "Failed",
                    status: 500
                })
                return;
            }
            const feedback = {} 
            feedback.enunciado = question.dataValues.enunciado;
            feedback.userAnswer = alt.getDataValue(q.answer);
            feedback.correctAnswer = alt.getDataValue(question.dataValues.rightChoise);
            feedback.correct = ans.DataValues.correct;
            points =  ans.dataValues.correct ? points+1 : points
            questions_resp.push(feedback)
           }
           const ts = await TS.create({fkUser: user.dataValues.id, fkTest: test.idTest, grade: (points/test.question.length) * 10}) 
           resp.questions = questions_resp
           resp.points = (points/test.question.length) * 10
           res.send({
            data: resp,
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
        const testes = await Test.findAll({where: {fkTurma: turma}})
        if(!testes){
            res.send({
                statusText: 'Sem turmas para retornar'
            })
            return;
        }
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
        try {
        const idProva = req.query.idProva 
        const resp = {}
        const users_resp = []
        const test = await Test.findOne({where: {id: idProva}})
        if(!test){
            res.send({
                statusText: "Failed",
                status: 500
            })
            return;
        }
        resp.name = test.dataValues.name 
        resp.idProva = test.dataValues.id 
        const TSs = await TS.findAll({where: {fkTest: test.dataValues.id}}) 
        if(!TSs){
        res.send({
            statusText: "Nenhum aluno fez a prova ainda",
            status: 500
        })
        return
    }
        for (const ts of TSs){
            const user = await  User.findOne({where: {id: ts.dataValues.id}})
            if(!user){
                res.send({
                    statusText: "Failed",
                    status: 500
                })
                return
            }
            const user_resp = {}
            user_resp.email = user.dataValues.email
            user_resp.grade = ts.dataValues.grade 
            users_resp.push(user_resp)
        }
        resp.users_resp = users_resp
        res.send({
            data: resp,
            statusText: 'Sucesso'
        })
    } catch (error) {
            console.log(error)
    }
    }, 
    async feedbackAluno (req, res) {
        try {
        const email = req.query.email
        const idProva = req.query.idProva 
        const user = await User.findOne({where: {email: email}})
        if(!user){
            res.send({
                statusText: "Failed",
                status: 500
            })
            return;
        }
        const ts = await TS.findOne({where: {fkTest: idProva, fkUser: user.dataValues.id}})
        if(!ts){
            res.send({
                statusText: "Aluno nao fez a prova ainda"
            })
        }
        const resp = {}
        const questions_resp = []
        resp.email = email
        resp.grade = ts.grade 
        const questions = await Question.findAll({where: {fkTestId: idProva}})
        if(!questions){
            res.send({
                statusText: "Failed",
                status: 500
            })
            return;
        }
        for(const q of questions){
            const ans = await Answers.findOne({where: {fkUser: user.dataValues.id, fkQuestion: q.dataValues.id}})
            if(!ans) {
                res.send({
                    statusText: "Failed",
                    status: 500
                })
                return;
            }
            const alt = await Alternatives.findOne({where: {id: q.dataValues.fkAlternatives}})
            if(!alt){
                res.send({
                    statusText: "Failed",
                    status: 500
                })
                return;
            }
            const feedback = {} 
            feedback.enunciado = q.dataValues.enunciado;
            feedback.userAnswer = alt.getDataValue(q.answer);
            feedback.correctAnswer = alt.getDataValue(q.dataValues.rightChoise);
            feedback.correct = ans.DataValues.correct;
            questions_resp.push(feedback)
           }
           resp.questions_resp = questions_resp
           res.send({
            data: resp,
            statusText: 'Sucesso'
        })
        } catch (error) {
            console.log(error)
        }
    }
}