const db = require("../models");
const axios = require("axios");

module.exports = function(app, passport) {
  app.get("/movies", function(req, res) {
    if (req.isAuthenticated()) {
      db.Movie.findAll({
        include: [db.Review],
        where: {
          user_id: req.session.passport.user
        }
      }).then(function(dbMovies) {
        const user = {
          userInfo: { first_name: req.cookies.first_name },
          id: req.session.passport.user,
          isloggedin: req.isAuthenticated()
        };
        console.log(`list-movies function: ${JSON.stringify(user, null, 2)}`);

        res.render("movie-list", {
          movies: dbMovies,
          user: user,
          isloggedin: true
        });
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

  app.get("/movies/for-review", function(req, res) {
    if (req.isAuthenticated()) {
      db.Movie.findAll({
        include: [{ model: db.Review, required: false, attributes: [] }],
        where: {
          user_id: req.session.passport.user,
          "$Reviews.id$": null
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
      actor: req.body.actor,
      director: req.body.director,
      country: req.body.country,
      awards: req.body.awards,
      imdb_ratings: req.body.imdb_ratings,
      budget: req.body.budget,
      rotten_tomatoes: req.body.rotten_tomatoes,
      user_id: req.session.passport.user
    }).then(function(dbMovie) {
      res.json(dbMovie);
    });
  });

  app.get("/movie/omdb/:title", function(req, res) {
    if (req.isAuthenticated()) {
      const queryURL =
        "https://www.omdbapi.com/?apikey=" +
        process.env.OMDB_KEY +
        "&t=" +
        req.params.title;

      axios
        .get(queryURL)
        .then(function(response) {
          res.json(response.data);
        })
        .catch(function(error) {
          console.error(error);
        });
    }
  });
};
