// DEPENDENCIES
// npm packages that gives our server useful functionality
var express = require("express");

// Tells node that we are creating an "express" server
var app = express();

// Sets an initial port. We"ll use this later in our listener
var PORT = process.env.PORT || 8085;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use(express.static(__dirname + 'app/public'));

// ROUTER
// Points our server to a series of "route" files
// Gives our user a "map" of how to respond when users visit or request data from various URLs
require("./app/routing/apiRoutes.js")(app);
require("./app/routing/htmlRoutes.js")(app);

// LISTENER
// The below code effectively "starts" our server

app.listen(PORT, function() {
  console.log("Server listening on: http://localhost:" + PORT);
});
