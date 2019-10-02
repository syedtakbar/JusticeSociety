const db = require("../models");
module.exports = function(app, passport) {
  app.get("/", function(req, res) {
    if (req.isAuthenticated()) {
      const user = {
        userInfo: { first_name: req.cookies.first_name },
        id: req.session.passport.user,
        isloggedin: req.isAuthenticated()
      };
      console.log(`home function: ${JSON.stringify(user, null, 2)}`);
      res.render("home", user);
    } else {
      res.render("home");
    }
  });

  app.get("/movie/new", function(req, res) {
    const userData = {
      userInfo: { first_name: req.cookies.first_name },
      id: req.session.passport.user,
      isloggedin: req.isAuthenticated()
    };
    console.log(`add movie function: ${JSON.stringify(userData, null, 2)}`);
    res.render("add-movie", userData);
  });

  app.get("/review/new", function(req, res) {
    const userData = {
      userInfo: { first_name: req.cookies.first_name },
      id: req.session.passport.user,
      isloggedin: req.isAuthenticated()
    };
    console.log(`post function: ${JSON.stringify(userData, null, 2)}`);
    if (req.isAuthenticated()) {
      db.Movie.findAll({
        include: [{ model: db.Review, required: false, attributes: [] }],
        where: {
          user_id: req.session.passport.user,
          "$Reviews.id$": null
        }
      }).then(function(dbMovies) {
        if (dbMovies.length > 0) {
          console.log(
            `hitting post-review: ${JSON.stringify(dbMovies, null, 2)}`
          );
          res.render("post-review", userData);
        } else {
          console.log(
            `hitting add-movie: ${JSON.stringify(dbMovies, null, 2)}`
          );
          res.render("add-movie", userData);
        }
      });
    }
  });

  app.get("/list-movies", function(req, res) {
    res.get("/movies");
  });

  app.get("/signup", function(req, res) {
    if (req.isAuthenticated()) {
      res.redirect("/users/view");
    } else {
      res.render("create-user");
    }
  });

  app.get("/add-user", function(req, res) {
    if (req.isAuthenticated()) {
      res.render("create-user");
    } else {
      res.redirect("/");
    }
  });
};
