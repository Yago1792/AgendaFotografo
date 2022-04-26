const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');

const { loginRequired} = require('./src/middlewares/middleware');

// Rotas de Login
route.get('/login/index', loginController.index);
route.post('/login/login', loginController.login);
route.post('/login/register', loginController.register);
route.get('/login/logout', loginController.logout);

// Rotas da home
route.get('/', homeController.paginaInicial);
route.post('/', loginRequired, homeController.registraEnsaio);

// Rotas ensaios
route.get('/ensaios/delete/:id', loginRequired, homeController.delete);
route.get('/ensaios/edit/:id', loginRequired, homeController.edit);
route.post('/ensaios/edited/:id', loginRequired, homeController.editing);
route.get('/ensaios/deleteall', loginRequired, homeController.deleteAll);

// Rotas de filtro
route.get('/sortByNum', loginRequired, homeController.sortByNum);
route.get('/sortByName', loginRequired, homeController.sortByName);
route.get('/sortByValor', loginRequired, homeController.sortByValor);
route.get('/sortByStatus', loginRequired, homeController.sortByStatus);
route.get('/sortByLucro', loginRequired, homeController.sortByLucro);


module.exports = route; 