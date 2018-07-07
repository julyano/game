var express = require('express');// lib do Node
var router = express.Router();// o Router é uma interface que possui, basicamente, um Map
//que auxilia nas rotas usando funções de callback
var file_module_login = require('../views/view.login');

function login() {
    router.get('/',file_module_login.renderedLogin);
}

module.exports = {
    login: login,
};