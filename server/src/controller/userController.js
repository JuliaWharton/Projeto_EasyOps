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
      res.statusMessage = 'Usuario nao encontrado';
            res.status(400).send({
              data: email
            });
    }else {
      if(senha == user.dataValues.senha ){
        res.statusMessage = 'Mude sua senha';
            res.status(200).send({
              data: email,
              tipo: user.dataValues.tipo
            });
        return;
}else{
      bcrypt.compare(senha, user.dataValues.senha, (error, response) => {
        if (error) res.send(error);
        if (response) {
          res.statusMessage = 'Sucesso';
          res.status(200).send({
            data: email,
            tipo: user.dataValues.tipo
          });
        } else{
          res.statusMessage = 'Senha Incorreta';
            res.status(201).send({
              data: email
            });
            return;
        }
      });
    }
  }
  },
  

  async mudaSenha(req, res) {
    const email = req.query.email;
    const Senha = req.query.senha;
    const salt = await bcrypt.genSalt(10);
    const bsenha = await bcrypt.hash(Senha, salt)
    newSenha = User.update({senha: bsenha}, {where: {email: email}})
    res.statusMessage = 'Senha Alterada com sucesso';
    res.status(200).send({
      data: email
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
