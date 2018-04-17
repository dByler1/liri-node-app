

//bring in the .env file that github will ignore
require("dotenv").config();

//bring in the npm packages
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require("request");
var fs = require('fs');

//bring in the keys file
var keys = require('./keys.js');

//construct twitter and spotify objects
var spotifyObj = new Spotify(keys.spotify);
var twitterObj = new Twitter(keys.twitter);

//take in commands
var command1 = process.argv[2];
var input = process.argv.slice(3);
// Build commands after the first command into a string
command2 = input.join(" ");
console.log(command2);

//twitter command
if (command1 == "my-tweets") {
    var screenName = {screen_name: 'Baazzingga'};
    twitterObj.get('statuses/user_timeline', screenName, function(error, tweets){
        //get the responses readable
        //fs.writeFile('tweets.json', JSON.stringify(tweets, null, 4));
        if(error){
          console.log(error);
        }

        else{
            //TODO: limit the tweets returned to 20
        for(var i = 0; i<tweets.length; i++){
            var date = tweets[i].created_at;
            //TODO: display oldest to newest
            console.log("Baazzingga: " + tweets[i].text);
        }
      }
    });
}


if (command1 == 'spotify-this-song'){
    
    //TODO: GET THE "NO SONG DEFINED THING WORKING"
    if (process.argv.length < 4) {
        //console.log("Im in");
        var song = "The ace is base";
        spotifyObj.search({ type: 'track', query: song}, function(err, data) {
            if (err) {
              return console.log('Uh-Oh Oh No: ' + err);
            }
            //get the object in a readable way
            //fs.writeFile('pretty.json', JSON.stringify(data, null, 4));
    
            var listTotal = data.tracks.total;
            console.log("There are: " + listTotal + " results" )
            console.log("Here's the first result:")
             var firstResultArtistName = data.tracks.items[0].album.artists[0].name;
             var firstResultAlbumName = data.tracks.items[0].album.name;
             var firstResultTrackName = data.tracks.items[0].name;
             var firstResultTrackURL = data.tracks.items[0].href;
             console.log("Artist Name: " + firstResultArtistName);
             console.log("Album Name: " + firstResultAlbumName);
             console.log("Track Name: " + firstResultTrackName);
          });
    }
   
    spotifyObj.search({ type: 'track', query: command2 }, function(err, data) {
        if (err) {
          return console.log('Uh-Oh Oh No: ' + err);
        }
        //get the object in a readable way
        //fs.writeFile('pretty.json', JSON.stringify(data, null, 4));

        var listTotal = data.tracks.total;
        console.log("There are: " + listTotal + " results" )
        console.log("Here's the first result:")
         var firstResultArtistName = data.tracks.items[0].album.artists[0].name;
         var firstResultAlbumName = data.tracks.items[0].album.name;
         var firstResultTrackName = data.tracks.items[0].name;
         var firstResultTrackURL = data.tracks.items[0].href;
         console.log("Artist Name: " + firstResultArtistName);
         console.log("Album Name: " + firstResultAlbumName);
         console.log("Track Name: " + firstResultTrackName);
         console.log("Track URL: " + firstResultTrackURL);
      });
}



if (command1 == 'movie-this') {
    request('http://www.omdbapi.com/?apikey=trilogy&t=' + command2, function (error, response, body) {
        if(error) {
            return console.log('error:', error); 
        }
        var data = JSON.parse(body);
         console.log('Title: ' + data.Title);
         console.log("Released: "  + data.Released);
         console.log("IMDB Rating: "  + data.Ratings[0].Value);
         
         if (data.Ratings[1].Value == null ) {
             console.log("Rotten Tomatoes Rating: None")
         } else {
            console.log("Rotten Tomatoes Rating: "  + data.Ratings[1].Value);
        }
         console.log("Country of Production: "  + data.Country);
         console.log("Language: "  + data.Language);
         console.log("Plot: "  + data.Plot);
         console.log("Actors: "  + data.Actors);
});
}
