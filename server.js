require("dotenv").config();
const express = require("express");
const exphbs = require("express-handlebars");

const passport = require("passport");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session"); // cookie session

const app = express();
const PORT = process.env.PORT || 3000;

const db = require("./models");

require("./config/pass")(passport);

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.static("public"));

app.use(
  session({
    key: "user_sid",
    secret: "movie-user",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 1200000
    }
  })
);
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Routes
require("./controllers/html-routes")(app, passport);
require("./controllers/user-controller")(app, passport);
require("./controllers/movie-controller")(app, passport);
require("./controllers/review-controller")(app, passport);

const syncOptions = { force: false };

if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
