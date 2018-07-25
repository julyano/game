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

var parameterLogin;
var parameterCad;
var localStorage;

/*router.get('/teste', (req, res) => {
  res.sendFile(teste); 
});
*/
router.get('/erro', (req, res) => {
  res.sendFile(erro); 
});

router.get('/', (req, res) => {  
  res.sendFile(home); 
});

/*router.get('/jogos', (req, res) => {
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
});

router.post('/cadastro', (req, res) => {
  var param = req.body;
  if(param.cadpassword != param.cadrepassword){
    res.redirect('/#login');
  }
});*/

router.post('/captcha', function(req, res) {

  if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null)
  {
    //return res.json({"responseError" : ", por favor selecione o captcha, primeiro"});
    snackBar('skbcad','falha',', por favor selecione o captcha, primeiro!');
  }
  const secretKey = process.env.SECRET_KEY;

  const verificationURL = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;

  request(verificationURL,function(error,response,body) {
    body = JSON.parse(body);

    if(body.success !== undefined && !body.success) {
      //return res.json({"responseError" : "Failed captcha verification"});
      snackBar('skbcad','falha',' na verificação do captcha!');
    }

    if(req.body.loginmail === undefined || req.body.loginmail === '' || req.body.loginmail === null)
      if(req.body.cadmail === undefined || req.body.cadmail === '' || req.body.cadmail === null)
        res.sendFile(erro);
    
    if(req.body.cadmail){
      if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');     
      }

      localStorage.setItem('cadmail', req.body.cadmail); 

      if(req.body.cadpassword != req.body.cadrepassword){
        snackBar('skbcad','falha',', senhas diferentes!');
      }else{
        res.redirect('/#login'); 
      }
       
    }
    
    if(req.body.loginmail){
      if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');      
      }

      localStorage.setItem('loginmail', req.body.loginmail);

      res.redirect('/');
    }
  });
});

function snackBar(id, type, _msg) {
  // Get the snackbar DIV

  var msg;
  var layout;
  var x = document.getElementById(id);
  msg = (type == 'falha')? ' Falha'+ _msg:' Sucesso'+ +_msg;
  layoutSuccess = 'snackbar '+ type +' far fa-thumbs-up';

  // Add the "show" class to DIV
  x.className = layout;
  x.innerHTML = msg;

  // After 3 seconds, remove the show class from DIV
  setTimeout(function () { 
    x.className = x.className.replace(layout, '');
    x.innerHTML = x.innerHTML.replace(msg,'');
  }, 3000);
}

function validateLogin(id) {
  // Get the snackbar DIV
  var msgSuccess = ' Sucesso!';
  var layoutSuccess = 'snackbar sucesso far fa-thumbs-up';
  var x = document.getElementById(id);

  // Add the "show" class to DIV
  x.className = layoutSuccess;
  x.innerHTML = msgSuccess;

  // After 3 seconds, remove the show class from DIV
  setTimeout(function () { 
    x.className = x.className.replace(layoutSuccess, '');
    x.innerHTML = x.innerHTML.replace(msgSuccess,'');
  }, 3000);
}

module.exports = [router];


