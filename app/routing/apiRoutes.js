var friends = require("../data/friends.js");

module.exports = function(app) {
    // api path to get the friends data
    // responds with a jspn object (an array of friends)
    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function(req, res) {
        // newFriend is the user filling out the survey
        var newFriend = req.body;

        var bestMatch = {};

        for(var i = 0; i < newFriend.scores.length; i++) {
            if(newFriend.score[i] == "1 (Strongly Disagree)") {
                newFriend.scores[i] = 1;
            } else if(newFriend.score[i] == "5 (Strongly Agree)") {
                newFriend.scores[i] = 5;
            } else {
                newFriend.scores[i] = parseInt(newFriend.scores[i]);
            }
        }

        var bestMatchIndex = 0;
        var bestMatchDiff = 40;

        for(var i = 0; i < friends.length; i++) {
            var totalDifference = 0;

            for(var index = 0; index < friends[i].scores.length; i++) {
                var differenceOneScore = Math.abs(friends[i].scores[index] - newFriend.scores[index]);
                totalDifference += differenceOneScore;
            }

            if(totalDifference < bestMatchDiff) {
                bestMatchIndex = i;
                bestMatchDiff = totalDifference;
            }
        }

        // The bestMatchIndex is used to get the bestMatch data from friends index
        bestMatch = friends[bestMatchIndex];

        // Put new friend from survey in database array
        friends.push(newFriend);

        // Return the best match friend
        res.json(bestMatch);
            
        });

    };
       