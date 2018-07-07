var express = require('express');// lib do Node
var router = express.Router();// o Router é uma interface que possui, basicamente, um Map
var path    = require("path");
//que auxilia nas rotas usando funções de callback

router.use(express.static(__dirname + '../views'));
var f = path.join(__dirname, '../views/view.game.html');
console.log('f = '+f);
router.get('/', (req, res) => {
  res.sendFile(f); 
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
