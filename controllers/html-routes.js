module.exports = function(app, passport) {
  app.get("/", function(req, res) {
    if (req.isAuthenticated()) {
      const user = {
        userInfo: { first_name: req.cookies.first_name },
        id: req.session.passport.user,
        isloggedin: req.isAuthenticated()
      };
      res.render("home", user);
    } else {
      res.render("home");
    }
  });

  app.get("/movie/new", function(req, res) {
    res.render("add-movie");
  });

  app.get("/review/new", function(req, res) {
    res.render("post-review");
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
