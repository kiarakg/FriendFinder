var friends = require('../data/friends.js');

module.exports = function (app) {
  // Api path to get the friends data, responds with a json object (an array of friends)
  app.get('/api/friends', function (req,res) {
      res.json(friends);
  });

  // Updates an array of friends "database" array and sends back the json form of the most compatible new friend
  app.post('/api/friends', function (req, res) {
      var newFriend = req.body;

      // Compute best match from scores
      var bestMatch = {};

      for(var i = 0; i < newFriend.scores.length; i++) {
        if(newFriend.scores[i] == "1 (Strongly Disagree)") {
          newFriend.scores[i] = 1;
        } else if(newFriend.scores[i] == "5 (Strongly Agree)") {
          newFriend.scores[i] = 5;
        } else {
          newFriend.scores[i] = parseInt(newFriend.scores[i]);
        }
      }

      var bestMatchIndex = 0;
      
      var bestMatchDifference = 40;

      for(var i = 0; i < friends.length; i++) {
        var totalDifference = 0;

        for(var index = 0; index < friends[i].scores.length; index++) {
          var differenceOneScore = Math.abs(friends[i].scores[index] - newFriend.scores[index]);
          totalDifference += differenceOneScore;
        }

        // If the totalDifference in scores is less than the best match so far
        // Save that index and difference
        if (totalDifference < bestMatchDifference) {
          bestMatchIndex = i;
          bestMatchDifference = totalDifference;
        }
      }

      // The best match index is used to get the best match data from the friends index
      bestMatch = friends[bestMatchIndex];

      // Put new friend from survey in "database" array
      friends.push(newFriend);

      // Return the best match friend
      res.json(bestMatch);
  });

};
