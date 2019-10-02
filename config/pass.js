const LocalStrategy = require("passport-local").Strategy;

const db = require("../models");

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    console.log("user.uuid", user.uuid);
    done(null, user.uuid);
  });

  passport.deserializeUser(function(uuid, done) {
    console.log("deserializeUser.uuid", uuid);

    db.User.findOne({
      where: {
        uuid: uuid
      }
    }).then(function(user) {
      if (user) {
        console.log("found user!");
        done(null, user.get());
      } else {
        done(null, { msg: "no user found, must have been deleted" });
      }
    });
  });

  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "user_key",
        passReqToCallback: true
      },
      function(req, email, user_key, done) {
        process.nextTick(function() {
          db.User.findOne({
            where: {
              email: email
            }
          }).then(function(user, err) {
            if (err) {
              console.error(err);
              return done(err);
            }

            if (user) {
              console.log("signupMessage", "That email is already taken.");
              return done(
                null,
                false,
                req.flash("signupMessage", "That email is already taken.")
              );
            } else {
              db.User.create({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                user_key: db.User.generateHash(user_key)
              })
                .then(function(dbUser) {
                  return done(null, dbUser);
                })
                .catch(function(err) {
                  console.log(err);
                });
            }
          });
        });
      }
    )
  );

  passport.use(
    "local-login",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "user_key",
        passReqToCallback: true
      },
      function(req, email, user_key, done) {
        db.User.findOne({
          where: {
            email: req.body.email
          }
        }).then(function(user, err) {
          if (!user) {
            console.log("no user found");
            return done(
              null,
              false,
              req.flash("loginMessage", "No user found.")
            );
          }

          if (user && !user.validPassword(req.body.user_key)) {
            console.log("Oops! Wrong password.");
            return done(
              null,
              false,
              req.flash("loginMessage", "Oops! Wrong password.")
            );
          }
          return done(null, user);
        });
      }
    )
  );
};
