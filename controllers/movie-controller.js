const db = require("../models");

module.exports = function(app, passport) {
  app.get("/movies", function(req, res) {
    if (req.isAuthenticated()) {
      db.Movie.findAll({
        include: [db.Review],
        where: {
          user_id: req.session.passport.user
        }
      }).then(function(dbMovies) {
        res.render("movie-list", { movies: dbMovies });
      });
    }
  });

  app.get("/movies/list", function(req, res) {
    if (req.isAuthenticated()) {
      db.Movie.findAll({
        include: [db.Review],
        where: {
          user_id: req.session.passport.user
        }
      }).then(function(dbMovies) {
        res.json(dbMovies);
      });
    }
  });

  app.post("/movie", function(req, res) {
    db.Movie.create({
      title: req.body.title,
      plot: req.body.plot,
      release_date: req.body.release_date,
      ratings: req.body.ratings,
      imdb_link: req.body.imdb_link,
      genre: req.body.genre,
      budget: req.body.budget,
      rotten_tomatoes: req.body.rotten_tomatoes,
      user_id: req.session.passport.user
    }).then(function(dbMovie) {
      res.json(dbMovie);
    });
  });
};
