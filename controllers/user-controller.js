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
        res.render("maintain-user", user);
      });
    } else {
      const user = {
        id: null,
        isloggedin: req.isAuthenticated()
      };
      res.redirect("/");
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
      res.json(dbusers);
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

  // process the signup form ==============================================
  //=======================================================================

  app.post("/signup", function(req, res, next) {
    passport.authenticate("local-signup", function(err, user, info) {
      console.log("info", info);
      if (err) {
        console.log("passport err", err);
        return next(err); // will generate a 500 error
      }
      // Generate a JSON response reflecting authentication status
      if (!user) {
        console.log("user error", user);
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
          console.log("loginerr", loginerr);
          return next(loginErr);
        }
        //var userId = user.dataValues.id;
        console.log("redirecting....");

        res.cookie("first_name", user.first_name);
        res.cookie("user_id", user.uuid);
        return res.redirect("/users/view");
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
        //var userId = user.dataValues.id;
        console.log("redirecting....");
        res.cookie("first_name", user.first_name);
        res.cookie("user_id", user.uuid);

        // if (!req.session.userid) {
        //   var redirectTo = req.session.redirectTo ? req.session.redirectTo : "/";
        //   delete req.session.redirectTo;
        //   // is authenticated ?
        //   res.redirect(redirectTo);
        // } else {
        //     next();
        // }
        // console.log("=====================signup: ",req.headers.referer);
        return res.json(true);
        // return res.redirect("/user");
      });
    })(req, res, next);
  });

  //   app.get("/list-movies/movies", function(req,res){
  //       db.Movie.findAll({
  //       }).then(function(result){
  //           res.render(result);
  //       });
  //   });

  // app.put("/list-movies/movies/:user_id/:user_key", function(req,res){
  //       db.Movie.update({

  //       }).then(function(result){
  //           res.render(result);
  //       });
  //   });
};
