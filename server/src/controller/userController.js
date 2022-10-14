const bcrypt = require('bcrypt');
const db = require('../database/db');
const User = require('../models/user');

module.exports = {
  async login(req, res) {
    const email = req.body.email;
    const senha = req.body.senha;
    const user = await User.findOne({ where: { email: email } });
    if (!user){
      res.send({
        status: 400,
        data: { message: email },
        statusText: 'email não encontrado',
      });
    }else {
      if(senha == user.dataValues.senha ){
        res.send({
          admin: user.dataValues.Professor == 1,
          statusText: 'Mude sua senha o quanto antes!'
        });
}else{
      bcrypt.compare(senha, user.dataValues.senha, (error, response) => {
        if (error) res.send(error);
        if (response) {
          res.send({
            email: email,
            admin: user.dataValues.Professor == 1,
            data: { message: email },
            statusText: 'sucesso',
          });
        } else{
          res.send({
            status: 401,
            data: { message: email },
            statusText: 'Senha Incorreta',
          });
        }
      });
    }
  }
  },
  

  async mudaSenha(req, res) {
    const email = req.body[1].email;
    const Senha = req.body[0].senha;
    const confirmacao = req.body[0].confirmacao;

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
        statusText: 'senha alterada com sucesso!',
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
          admin: false,
        });
      res.send({
        data: { message: 'usuario encontrado' },
        valid: true,
        admin: user.Professor == 1,
      });
    }
    catch (error) {
      res.send({
        data: { message: 'usuario não encontrado' },
        valid: false,
        admin: false,
      });
    }
  },
};
