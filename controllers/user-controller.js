const db = require("../models");

module.exports = function(app, passport) {
  app.get("/signup", function(req, res) {
    res.render("create-user");
  });

  app.get("/users/view", function(req, res) {
    console.log(`isAuthenticated:  ${req.isAuthenticated()}`);

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

        res.render("maintain-user", user);
      });
    }
  });

  app.delete("/users/:email", function(req, res) {
    db.User.destroy({
      where: {
        email: req.params.email
      }
    }).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });

  app.put("/users/:email", function(req, res) {
    console.log(
      `executing update for : ${req.params.email} and ${req.body.user_key}`
    );
    db.User.update(
      {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        user_key:
          req.body.user_key.length > 8
            ? req.body.user_key
            : db.User.generateHash(req.body.user_key)
      },
      {
        where: {
          email: req.params.email
        }
      }
    ).then(function(dbusers) {
      res.json(dbusers);
    });
  });

  app.get("/logout", function(req, res) {
    req.session.destroy(function(err) {
      req.logout();
      res.clearCookie("user_sid");
      res.clearCookie("first_name");
      res.clearCookie("email");
      res.clearCookie("user_id");
      res.clearCookie("isloggedin");
      res.redirect("/");
    });
  });

  app.post("/signup", function(req, res, next) {
    passport.authenticate("local-signup", function(err, user, info) {
      if (err) {
        console.log("passport err", err);
        return next(err);
      }

      if (!user) {
        res.send({ success: false, message: "signup failed" });
      } else {
        // ***********************************************************************
        // "Note that when using a custom callback, it becomes the application"s
        // responsibility to establish a session (by calling req.login()) and send
        // a response."
        // Source: http://passportjs.org/docs
        // ***********************************************************************

        req.login(user, loginErr => {
          if (loginErr) {
            return next(loginErr);
          }

          console.log("local-signup success! ");

          res.cookie("first_name", user.first_name);
          res.cookie("email", user.email);
          res.cookie("user_id", user.uuid);
          res.cookie("isloggedin", req.isAuthenticated());

          res.send({ success: false, message: "signup successful" });
        });
      }
    })(req, res, next);
  });

  app.post("/login", function(req, res, next) {
    passport.authenticate("local-login", function(err, user, info) {
      if (err) {
        console.log("passport err", err);
        return next(err);
      }
      if (!user) {
        res.json({ success: false, message: "authentication failed" });
      } else {
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
          res.cookie("email", user.email);
          res.cookie("user_id", user.uuid);
          res.cookie("isloggedin", req.isAuthenticated());
          console.log("local-login success! ");
          res.send({ success: false, message: "login successful" });
        });
      }
    })(req, res, next);
  });
};
