// Dependencies
var path = require("path");

// Routing
module.exports = function(app) {
    // HTML GET Requests
    // Handles when users visit a page
    // User is shown an HTML page of content

    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });

    app.get("/survey", function(req, res){
        res.sendFile(path.join(__dirname, "../public/survey.html"));
    });

    app.get("*", function(req, res){
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });
};