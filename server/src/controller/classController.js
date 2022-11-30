const db = require('../database/db');
const User = require('../models/user');
const Class = require('../models/class');
const CS = require('../models/class_students')

module.exports = {
    async createClass(req, res) {
        try {
        const email = req.query.email;
        const nome = req.query.nome;
        const desc = req.query.desc; 
        const user = await User.findOne({ where: { email: email } });
        const turma = await Class.create({nome: nome, fkProfessorResponsavel: user.dataValues.id, descricao: desc});
        if(turma)
        res.send({
            statusText: "Suceso",
            data: turma.dataValues.nome
        });
        res.send({
            statusText: "Failed",
            status: 500
        });
        } catch (error) {
            res.send({
                statusText: "Failed",
                status: 500
            });
    }
    }, 
    async addstudent(req, res) {
        try {
            
        const email =req.query.email; 
        const idClass = req.query.idClass; 
        const user = await User.findOne({ where: { email: email } });
        res.send({
            status: 400,
            data: { message: email },
            statusText: 'email nao encontrado'
          });
        const fcs = await CS.findOne({ where: {fkUser: user.dataValues.id}});
        if (fcs && idClass == user.dataValues.fkTurma) res.send({
            status: 401,
            data: {message: email}, 
            statusText: 'aluno já esta na turma'
        });
        const cs = await CS.create({fkTurma: idClass, fkUser: user.dataValues.id});
        res.send({ 
            statusText: 'aluno inserido com sucesso', 
        });
        } catch (error) {
            res.send({
                statusText: "Failed",
                status: 500
            });
        }
    },
    async removeUser(req, res) {
        try {
            
            const email =req.query.email; 
            const idClass = req.query.idClass; 
            const user = await User.findOne({ where: { email: email } });
            res.send({
                status: 400,
                data: { message: email },
                statusText: 'email nao encontrado'
              });
            const fcs = await CS.findOne({ where: {fkUser: user.dataValues.id}});
            if (!fcs) res.send({
                status: 401,
                data: {message: email}, 
                statusText: 'aluno não está na turma'
            });
           await CS.destroy(fcs);
            res.send({ 
                statusText: 'aluno retirado da turma com sucesso', 
            });
            } catch (error) {
                res.send({
                    statusText: "Failed",
                    status: 500
                });
            }
    }, 
    async listaAlunos(req,res) {
        try {
            const idTurma = req.query.idTurma;
            const resp = [];
            const users = await CS.findAll({where: {fkTurma: idTurma}});
            for(const user of users){
                u = await User.findOne({where : {id: user.dataValues.fkUser}});
                resp.push(u.dataValues);
            }
            res.send({ 
                data: resp, 
                statusText: 'Sucesso'
            });

        } catch (error) {
            res.send({
                statusText: "Failed",
                status: 500
            });
        }
    }, 
    async listaDoProfessor(req, res) {
        try {
            console.log('omeco')
            const email  = req.query.email;
            console.log(email)
            const user = await User.findOne({where:{email: email}});
            const resp = [];
            if(!user)
            res.send({
                status: 400,
                data: { message: email },
                statusText: 'email nao encontrado'
              });
            const classes = await Class.findAll({ where: {fkProfessorResponsavel: user.dataValues.id}});
            if (!classes) res.send({
                status: 401,
                data: {message: email}, 
                statusText: 'professor sem turma cadastrada'
            });
            for(const c of classes) resp.push(c.dataValues);
            res.send({
                statusText: 'Sucesso', 
                data: resp
            }
            );
        }
        catch(erro) {
            res.send({
                statusText: erro,
                status: 500
            });
        }
    }
}