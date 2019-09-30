const db = require("../models");
let loginerr;
module.exports = function(app, passport) {
  app.get("/signup", function(req, res) {
    res.render("user");
  });

  app.get("/users/view", function(req, res) {
    console.log("%%%%%%%%% is logged in", req.isAuthenticated());

    if (req.isAuthenticated()) {
      db.User.findOne({
        where: {
          uuid: req.session.passport.user
        }
      }).then(function(dbUser) {
        const user = {
          userInfo: dbUser.dataValues,
          id: req.session.passport.user,
          isloggedin: req.isAuthenticated()
        };

        console.log("%%%%%%%%% found it", req.session.passport.user);
        res.json(user);
      });
    } else {
      res.json(false);
    }
  });

  app.delete("/users/:user_id/:user_key", function(req, res) {
    db.User.destroy({
      where: {
        id: req.params.user_id,
        user_key: req.params.userkey
      }
    }).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });

  app.put("/users/:user_id/:user_key", function(req, res) {
    db.User.update(
      {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        user_key: req.body.user_key
      },
      {
        where: {
          id: req.params.user_id,
          user_key: req.params.user_key
        }
      }
    ).then(function(dbusers) {
      return res.json(dbusers);
    });
  });

  // logout of user user
  app.get("/logout", function(req, res) {
    req.session.destroy(function(err) {
      req.logout();
      res.clearCookie("user_sid");
      res.clearCookie("first_name");
      res.clearCookie("user_id");
      res.redirect("/");
    });
  });

  app.post("/signup", function(req, res, next) {
    console.log("inside signup");
    passport.authenticate("local-signup", function(err, user, info) {
      if (err) {
        console.log("passport err", err);
        return next(err); // will generate a 500 error
      }

      console.log("local-signup success! ", info);

      if (!user) {
        console.log("user error", user);
        console.log("local-signup failed! ", user);
        return res.send({ success: false, message: "signup failed" });
      }

      // ***********************************************************************
      // "Note that when using a custom callback, it becomes the application"s
      // responsibility to establish a session (by calling req.login()) and send
      // a response."
      // Source: http://passportjs.org/docs
      // ***********************************************************************

      req.login(user, loginErr => {
        if (loginErr) {
          console.log("loginerr", loginerr);
          return next(loginErr);
        }
        //var userId = user.dataValues.id;
        console.log("local-signup success! ");
        console.log("redirecting....");

        res.cookie("first_name", user.first_name);
        res.cookie("user_id", user.uuid);
        res.redirect("/users/view");
      });
    })(req, res, next);
  });

  app.post("/login", function(req, res, next) {
    passport.authenticate("local-login", function(err, user, info) {
      console.log("\n\n\n########userrrr", user);
      if (err) {
        console.log("passport err", err);
        return next(err); // will generate a 500 error
      }
      // Generate a JSON response reflecting authentication status

      if (!user) {
        return res.send({ success: false, message: "authentication failed" });
      }

      // ***********************************************************************
      // "Note that when using a custom callback, it becomes the application"s
      // responsibility to establish a session (by calling req.login()) and send
      // a response."
      // Source: http://passportjs.org/docs
      // ***********************************************************************

      req.login(user, loginErr => {
        if (loginErr) {
          console.log("loginerr", loginErr);
          return next(loginErr);
        }
        console.log("redirecting....");
        res.cookie("first_name", user.first_name);
        res.cookie("user_id", user.uuid);
        res.json(true);
      });
    })(req, res, next);
  });
};
