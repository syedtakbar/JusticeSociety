//==============================================================================
// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality
// ==============================================================================

const express = require("express");
const path = require('path');
const exphbs = require("express-handlebars");
const bodyParser = require('body-parser');
// ==============================================================================
// EXPRESS CONFIGURATION
// This sets up the basic properties for our express server
// ==============================================================================
const movies = require('./app/data/movie.js');
//
// Tells node that we are creating an "express" server
const app = express();

// Sets an initial port. We"ll use this later in our listener
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// ================================================================================
// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.
// ================================================================================
// Routes
require('./app/routing/apiRoutes.js')(app);
require('./app/routing/htmlRoutes.js')(app);
//
//
// =============================================================================
// LISTENER
// The below code effectively "starts" our server
// =============================================================================

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});