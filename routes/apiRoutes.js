var db = require("../models");

module.exports = function(app) {
  // Get all movies
  app.get("/api/movies", function(req, res) {
    db.movies.findAll({}).then(function(dbmoviess) {
      res.json(dbmoviess);
    });
  });

  // Create a new movie
  app.post("/api/movies", function(req, res) {
    db.movies.create(req.body).then(function(dbmovies) {
      res.json(dbmovies);
    });
  });

  // Delete an movie by id
  app.delete("/api/movies/:id", function(req, res) {
    db.movies.destroy({ where: { id: req.params.id } }).then(function(
      dbmovies
    ) {
      res.json(dbmovies);
    });
  });
};
