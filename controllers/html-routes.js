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
    const user = {
      userInfo: { first_name: req.cookies.first_name },
      id: req.session.passport.user,
      isloggedin: req.isAuthenticated()
    };
    console.log(`add movie function: ${JSON.stringify(user, null, 2)}`);
    res.render("add-movie", user);
  });

  app.get("/review/new", function(req, res) {
    const user = {
      userInfo: { first_name: req.cookies.first_name },
      id: req.session.passport.user,
      isloggedin: req.isAuthenticated()
    };
    console.log(`post function: ${JSON.stringify(user, null, 2)}`);
    res.render("post-review", user);
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
