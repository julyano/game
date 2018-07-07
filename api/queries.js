var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
//var connectionString = 'postgres://startrek:123@localhost:5432/startrek'; // startrek is an example database name
//var connectionString = 'postgres://localhost:5432/startrek'; // startrek is an example database name
var connectionString = process.env.DATABASE_URL;
var db = pgp(connectionString);


/////////////////////
// Query Functions
/////////////////////

function getAllStarships(req, res, next) {
  db.any('SELECT * FROM starships;')
    .then(function (data) {
      console.log(data);
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved all starships'
        });
    })
    .catch(function (err) {
      console.log(err);
      return next(err);
    }
    
  );
}

function getStarship(req, res, next) {
  var id = parseInt(req.params.id);
  db.one('SELECT * FROM starships WHERE id = $1', id)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved one starship'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createStarship(req, res, next) {
  req.body.launched = parseInt(req.body.launched);

  db.any('SELECT * FROM starships;')
  .then(function (data) {
    console.log(data);
  });

  db.none('INSERT INTO starships(name, registry, affiliation, launched, class, captain)' +
      'values(${name}, ${registry}, ${affiliation}, ${launched}, ${class}, ${captain});',
    req.body)
    .then(function () {
      console.log(req.body);
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one starship'
        });
    })
    .catch(function (err) {
      console.log(err);
      return next(err);
    });
}

function updateStarship(req, res, next) {
  db.none('UPDATE starships SET name=$1, registry=$2, affiliation=$3, launched=$4, class=$5, captain=$6 where id=$7',
    [req.body.name, req.body.registry, req.body.affiliation, parseInt(req.body.launched), req.body.class, parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated starship'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeStarship(req, res, next) {
  var id = parseInt(req.params.id);
  db.result('DELETE FROM starships WHERE id = $1', id)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: 'Removed ${result.rowCount} starships'
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}

function getAllUsuarios(req, res, next) {
  db.any('SELECT * FROM usuario;')
    .then(function (data) {
      console.log(data);
      res.status(200)
        .json({
          status: 'sucesso',
          data: data,
          message: 'Todos os usuários retornados'
        });
    })
    .catch(function (err) {
      console.log(err);
      return next(err);
    }
    
  );
}

/////////////
// Exports
/////////////

module.exports = {
    getAllStarships: getAllStarships,
    getStarship: getStarship,
    createStarship: createStarship,
    updateStarship: updateStarship,
    removeStarship: removeStarship,
    getAllUsuarios: getAllUsuarios
};
