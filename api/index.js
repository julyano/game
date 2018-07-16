var express = require('express');// lib do Node
var router = express.Router();// o Router é uma interface que possui, basicamente, um Map
var path    = require("path");
//que auxilia nas rotas usando funções de callback

require('dotenv').config();
var request = require('request');

router.use(express.static(__dirname + '../views'));
var home = path.join(__dirname, '../views/view.home.html');
var jogos = path.join(__dirname, '../views/view.game.html');
var cadastro = path.join(__dirname, '../views/view.cadastro.html');
var sobre = path.join(__dirname, '../views/view.sobre.html');
var login = path.join(__dirname, '../views/view.login.html');
var teste = path.join(__dirname, '../views/view.teste.html');
var erro = path.join(__dirname, '../views/view.erro.html');

router.get('/teste', (req, res) => {
  res.sendFile(teste); 
});

router.get('/erro', (req, res) => {
  res.sendFile(erro); 
});

router.get('/', (req, res) => {
  res.sendFile(home); 
});

router.get('/jogos', (req, res) => {
  res.sendFile(jogos); 
});

router.get('/cadastro', (req, res) => {
  res.sendFile(cadastro); 
});

router.get('/sobre', (req, res) => {
  res.sendFile(sobre); 
});

router.get('/login', (req, res) => {
  res.sendFile(login); 
});

router.post('/login', (req, res) => {
  var param = req.body;
  //console.log(param);
  console.log(param.loginmail);
  console.log(param.loginpassword);
  //res.redirect('/captcha');
});

router.post('/cadastro', (req, res) => {
  var param = req.body;
  //console.log(param);
  if(param.password != param.repassword){
    res.redirect('/#login');
  }
  console.log(param.cadastromail);
  console.log(param.cadastropassword);
});

router.post('/captcha', function(req, res) {
  console.log('CAPTCHA');
  if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null)
  {
    return res.json({"responseError" : "Please select captcha first"});
  }
  const secretKey = process.env.SECRET_KEY;

  const verificationURL = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;

  request(verificationURL,function(error,response,body) {
    body = JSON.parse(body);

    if(body.success !== undefined && !body.success) {
      return res.json({"responseError" : "Failed captcha verification"});
    }
    console.log('sucesso '+req.body.loginmail);
    if(req.body.loginmail === undefined || req.body.loginmail === '' || req.body.loginmail === null)
      if(req.body.cadastromail === undefined || req.body.cadastromail === '' || req.body.cadastromail === null)
        res.sendFile(erro);
    if(req.body.cadastromail) res.redirect('/#login');
    if(req.body.loginmail) res.redirect('/#home');
    //res.json({"responseSuccess" : "Sucess"});
    //res.redirect('/');
  });
});

/*var fs = require('fs');
var Path = require('path');
var _path = Path.join(__dirname, '../views');
var file_view = _path+'/view.game.html';

console.log('path = '+ _path);

fs.readFile(file_view, function (err, html) {
  
  if (err) {
      console.log('[ERRO] HTML = ' +  html);
      throw err; 
  }

  router.get('/', (req, res) => {
    res.send(''+html); 
  });
    
});*/

module.exports = [router];
