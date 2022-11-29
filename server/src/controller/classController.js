const db = require('../database/db');
const User = require('../models/user');
const Class = require('../models/class');
const CS = require('../models/class_students')

module.exports = {
    async createClass(req, res) {
        try {
        const email = req.body.email
        const nome = req.body.nome 
        const desc = req.body.desc 
        const user = await User.findOne({ where: { email: email } });
        const turma = await Class.create({nome: nome, fkProfessorResponsavel: user.dataValues.id, descricao: desc})
        if(turma)
        res.send({
            statusText: "Suceso",
            data: turma.dataValues.nome
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
    async addstudent(req, res) {
        try {
            
        const email =req.body.email 
        const idClass = req.body.idClass 
        const user = await User.findOne({ where: { email: email } });
        res.send({
            status: 400,
            data: { message: email },
            statusText: 'email nao encontrado'
          });
        const fcs = CS.findOne({ where: {fkUser: user.dataValues.id}})
        if (fcs && idClass == user.dataValues.fkTurma) res.send({
            status: 401,
            data: {message: email}, 
            statusText: 'aluno já esta na turma'
        })
        const cs = CS.create({fkTurma: idClass, fkUser: user.dataValues.id})
        res.send({ 
            statusText: 'aluno inserido com sucesso', 
        })
        } catch (error) {
            res.send({
                statusText: "Failed",
                status: 500
            })
        }
    },
    async removeUser(req, res) {
        try {
            
            const email =req.body.email 
            const idClass = req.body.idClass 
            const user = await User.findOne({ where: { email: email } });
            res.send({
                status: 400,
                data: { message: email },
                statusText: 'email nao encontrado'
              });
            const fcs = CS.findOne({ where: {fkUser: user.dataValues.id}})
            if (!fcs) res.send({
                status: 401,
                data: {message: email}, 
                statusText: 'aluno não está na turma'
            })
           fcs.destroy()
            res.send({ 
                statusText: 'aluno retirado da turma com sucesso', 
            })
            } catch (error) {
                res.send({
                    statusText: "Failed",
                    status: 500
                })
            }
    }, 
    async listaAlunos(req,res) {
        try {
            const idTurma = req.body.idTurma;
            const resp = [];
            const users = CS.findAll({where: {fkTurma: idTurma}})
            for(const user of users){
                u = User.findOne({where : {id: user.dataValues.fkUser}});
                resp.push(u.dataValues)
            }
            res.send({ 
                data: resp, 
                statusText: 'Sucesso'
            })

        } catch (error) {
            res.send({
                statusText: "Failed",
                status: 500
            })
        }
    }, 
    async listaDoProfessor(req, res) {
        try {
            const email  = req.body.email
            const user = await User.findOne({ where: { email: email } });
            if(!user) res.send()
        } catch (error) {
            res.send({
                status: 400,
                data: { message: email },
                statusText: 'email nao encontrado'
              });
            const classes = Class.findAll({ where: {fkProfessorResponsavel: user.dataValues.id}})
            if (!classes) res.send({
                status: 401,
                data: {message: email}, 
                statusText: 'professor sem turma cadastrada'
            })
            res.send({
                statusText: 'Sucesso', 
                data: classes.dataValues
            }

            )
        }
    }
}