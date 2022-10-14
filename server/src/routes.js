const express = require('express');

const routes = express.Router();
const userController = require('./controller/userController');



routes.get('/', (req, res) => {
    return res.json({
        message: 'Hello World'
    });
})


routes.post('/login', userController.login);
routes.post('/Profile', userController.mudaSenha);
routes.get('/validateCredentials', userController.validateCredentials);




module.exports = routes;