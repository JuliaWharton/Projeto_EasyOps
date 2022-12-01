const bcrypt = require('bcrypt');
const db = require('../database/db');
const User = require('../models/user');
const Class = require('../models/class')

module.exports = {
  async login(req, res) {
    const email = req.body.email;
    const senha = req.body.senha;
    const user = await User.findOne({ where: { email: email } });
    if (!user){
      res.send({
        status: 400,
        data: { message: email },
        statusText: 'email não encontrado'
      });
    }else {
      if(senha == user.dataValues.senha ){
        res.send({
          tipo: user.dataValues.tipo,
          statusText: 'Mude sua senha o quanto antes!'
        });
}else{
      bcrypt.compare(senha, user.dataValues.senha, (error, response) => {
        if (error) res.send(error);
        if (response) {
          res.send({
            email: email,
            tipo: user.dataValues.tipo,
            data: { message: email },
            statusText: 'sucesso'
          });
        } else{
          res.status(201).send({
            data: email,
            statusText: 'Senha Incorreta'})
        }
      });
    }
  }
  },
  

  async mudaSenha(req, res) {
    const email = req.query.email;
    const Senha = req.query.senha;
    const confirmacao = req.query.confirmacao;
    if(confirmacao != Senha){
      res.send({
        status: 401,
        statusText: 'As senhas não batem'
      })
      return;
    }

    usuario = await User.findOne({ where: { email: email } });
    const salt = await bcrypt.genSalt(10);
    usuario.senha = await bcrypt.hash(Senha, salt)
    usuario.save();
      res.send({
        status: 200,
        data: { message: email },
        statusText: 'senha alterada com sucesso!'
      });
  
   },
  


  async validateCredentials(req, res) {
    try {
      const email = req.query.email;
      const user = await User.findOne({ where: { email: email } });
      if (!user)
        res.send({
          data: { message: 'usuario não encontrado' },
          valid: false,
        });
      res.send({
        data: user.dataValues, 
        valid: true
      });
    }
    catch (error) {
      console.log(error)
    }
  }, 
  async deleteUser (req,res) {
    try {
      const email = req.query.email;
      const user = await User.findOne({ where: { email: email } });
      if (!user){
        res.send({
          data: { message: 'usuario não encontrado' },
          valid: false
        });
        return;
        }
      await user.destroy()  
      res.send({
        data: { message: 'usuario deletado' },
        valid: true
      });
    }
    catch (error) {
      console.log(error)
      return
    }
  }, 
  async createUser(req, res){
    try {
      const email = req.query.email 
      const nusp = req.query.nusp 
      const cpf = req.query.cpf 
      const tipo = req.query.tipo
      const olduser = await User.findOne({where: {email: email }})
      if(olduser){
        res.send({
          data: email,
          statusText: 'Já existe um usuario com este email'
        })
        return;
      }
      const user = await User.create({email: email, nusp: nusp, senha: nusp, cpf: cpf, tipo: tipo})
      if(user) res.send({
        data: user.dataValues.tipo, 
        valid: true
      });
      else res.send({
        statusText: "Failed",
        status: 500
    })
    }
    catch(error) {
      console.log(error)
    }
  }
};
