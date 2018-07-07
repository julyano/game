var express = require('express');// lib do Node
var router = express.Router();// o Router é uma interface que possui, basicamente, um Map
//que auxilia nas rotas usando funções de callback
var view_home = require('../api/index');

// http://localhost:3000/
router.get('/', view_home);

module.exports = router;
