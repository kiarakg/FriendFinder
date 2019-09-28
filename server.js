// DEPENDENCIES

var express = require("express");

// EXPRESS CONFIGURATION
// This sets up the basic properties for our express server
// Tells node that we are creating an "express" server
var app = express();

// PORT
var PORT = process.env.PORT || 8001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(__dirname + '/app/public'));

// ROUTER
// Points our server to a series of "route" files.
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

// LISTENER
// "Starts" our server

app.listen(PORT, function() {
  console.log("Server listening on: http://localhost:" + PORT);
});
