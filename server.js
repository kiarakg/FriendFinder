// DEPENDENCIES
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Tells node that we are creating an "express" server
var app = express();

// Sets an initial port. We"ll use this later in our listener
var PORT = process.env.PORT || 8085;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json "}));

app.use(express.static("app/public"));

// ROUTER
require("./app/routing/apiRoutes.js")(app);
require("./app/routing/htmlRoutes.js")(app);

// LISTENER
// The below code effectively "starts" our server

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
