const db = require("../models");
module.exports = function(app, passport) {
  app.get("/", function(req, res) {
    if (req.isAuthenticated()) {
      var user = {
        id: req.session.passport.user,
        isloggedin: req.isAuthenticated()
      };
      res.render("home", user);
    } else {
      res.render("home");
    }
  });

  app.get("/list-movies", function(req, res) {
    res.render("search");
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

  app.get("/user/:user_id/:user_key", function(req, res) {
    res.render("add-movies");
  });
};
