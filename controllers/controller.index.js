var express = require('express');// lib do Node
var router = express.Router();// o Router é uma interface que possui, basicamente, um Map
//que auxilia nas rotas usando funções de callback
var view_home = require('../api/index');

// http://localhost:3000/
router.get('/', view_home);
router.get('/teste', view_home);
router.get('/jogos', view_home);
router.get('/cadastro', view_home);
router.get('/sobre', view_home);
router.get('/login', view_home);
router.get('/erro', view_home);

router.post('/cadastro', view_home);
router.post('/login', view_home);
router.post('/captcha', view_home);

module.exports = router;
