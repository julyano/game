
var express = require('express');// lib do Node
var router = express.Router();// o Router é uma interface que possui, basicamente, um Map
//que auxilia nas rotas usando funções de callback

var fs = require('fs');
var Path = require('path');
var _path = Path.join(__dirname, '../views');
var file_view_login = _path+'/view.login.html';
console.log('path = '+ _path);

function renderedLogin(req, res, next) {
    fs.readFile(file_view_login, function (err, html) {
        
        if (err) {
            console.log('[ERRO] HTML = ' +  html);
            throw err; 
        }
      
        router.get('/', (req, res) => {      
          res.send(''+html); 
        });
          
      });
}

function OnClick(req, res, next){

    console.log("ok"+req);
}

// http://localhost:3000/



//////////////////////
// Postgres queries
//////////////////////

//var db = require('./queries');//O arquivo queries carrega as configurações
// de acesso ao banco e suas funções de manipulação disponíveis

/*router.get('/api/starships', db.getAllStarships);
router.get('/api/starships/:id', db.getStarship);
router.post('/api/starships', db.createStarship);
router.put('/api/starships/:id', db.updateStarship);
router.delete('/api/starships/:id', db.removeStarship);

router.get('/api/usuarios', db.getAllUsuarios);
*/
module.exports = {
    renderedLogin: renderedLogin,
}

// http://localhost:3000/
/*router.get('/', function(req, res, next) {
    res.status(200)
      .json({
        status: 'success',
        message: 'Live long and prosper!'
      });
});*/

