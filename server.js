var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var request = require('request');

//var api = require('./api/index');
var api = require('./controllers/controller.index');
require('dotenv').config();

// TODO: remover variável
var enviroment = "Produção";

var app = express();


///////////////////////
// Server Middleware
///////////////////////

app.use(logger(app.get("env") === "production" ? "combined" : "dev"));

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// CORS
// This allows client applications from other domains use the API Server
app.use(function(req, res, next) {
    //TODO: melhorar configurações do CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


//////////////////
// API Queries
//////////////////

app.use('/', api);

app.use('/css',express.static('css'));
app.use('/js',express.static('js'));
app.use('/api',express.static('api'));

//////////////////
// Server Setup
//////////////////

app.set("env", process.env.ENV || "development");
app.set("host", process.env.HOST || "0.0.0.0");
app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"), function () {
    console.log('\n' + '**********************************');
    if(process.env.ENV === "development") {
        console.log('[Atenção]: Ambiente de Desenvolvimento');
    } else {
        console.log('[Atenção]: Ambiente de Produção');
    }

    console.log('Servidor escutando na porta ' + app.get("port"));
    console.log('**********************************' + '\n');
});


////////////////////
// Error Handlers
////////////////////

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status( err.code || 500 )
        .json({
            status: 'error',
            message: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    .json({
        status: 'error',
        message: err.message
    });
});


module.exports = app;
