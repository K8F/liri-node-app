require("dotenv").config();

//packages
var fs = require("fs")
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

//variable to read the command
var command = process.argv[2];
//variable that holds full string of user input
var input = "";
//stores arguments in array;
var nodeArgs = process.argv;

//needed to run axios
//var inputv1 = process.argv.slice(3).join(" ")   // array to string 
//console.log(inputv1)

//for loop that readys input for API string. 
for (var i = 3; i < nodeArgs.length; i++) {

  if (i > 3 && i < nodeArgs.length) {
    input = input + "+" + nodeArgs[i];
  } else {
    input += nodeArgs[i];

  }

}

//console.log(command,input);
menubar(command)

//switch that runs function when a certain command is used
function menubar() {

  switch (command) {
    case "concert-this":
      concertThis();
      break;

    case "spotify-this-song":
      spotifyThis();
      break;

    case "movie-this":
      movieThis();
      break;

    case "do-what-it-says":
      doWhatItSays()
      break;

  }
}


//take in the following commands: 
//concert-this
//input: 'node liri.js concert-this <artist name>
//api: Bands in Town Artist events API
//"https://rest.bandisintown.com/artists" + artist + "/events?app_id=codingbootcamp" (note-codingbootcamp id works)

//return: Name of venue, venue locatiion, dates of even (moment MM/DD/YYYY)

function concertThis() {
  var queryURL = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=" +keys.bands.id;
  //console.log(queryURL)
  axios.get(queryURL).then(

    function (response) {
      for (var i = 0; i < response.data.length; i++) {
        console.log("======================================")

        console.log("Venue Name: " + response.data[i].venue.name);
        console.log("Venue Location: " + response.data[i].venue.city + ", " + response.data[i].venue.country);
        console.log("Date of the Event: " + moment(response.data[i].datetime).format("L"));

        console.log("======================================")
      }

    })
}


//spotify-this-song
//api:  [node-spotify-api](https://www.npmjs.com/package/node-spotify-api)
//input: 'node liri.js spotify-this-song '<song name>'
//return: artist, song name, preview link to spotify, album
//if no song is provided, program returns: "The Sign" by Ace of Base.
function spotifyThis() {
  // Catch empty input
  if (!input) {
    input = "The Sign Ace of Base";
  }
  spotify.search({ type: "track", query: input }, function (err, data) {
    if (err) {
      logThis(err);
    }

    var userSong = data.tracks.items;

    console.log("======================================")

    console.log("Artist: " + userSong[0].artists[0].name);
    console.log("Song Name: " + userSong[0].name);
    console.log("Preview Link: " + userSong[0].preview_url);
    console.log("Album: " + userSong[0].album.name);

    console.log("======================================")

  });
}



//movie-this
//api: omdb api (key-trilogy), need axios package
//input: node.liri.js movie-this 'movie name'
//return: title, year, imdb rating, rotten tomatoes rating, country, language, plot, actors
//if no movie is probided, return "mr nobody"

function movieThis() {

  if (!input) {
    input = "Mr. Nobody";
    console.log("If you haven't watched 'Mr. Nobody,' then you should: <http://www.imdb.com/title/tt0485947/>");
    console.log("It's on Netflix!");
  }
  var queryURL = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=" + keys.movies.id;

  //console.log(queryURL)

  axios.get(queryURL).then(
    function (response) {
      console.log("======================================")

      console.log("Title: " + response.data.Title);
      console.log("Release Year: " + response.data.Year);
      console.log("IMDB Rating: " + response.data.imdbRating);
      console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value)
      console.log("Country: " + response.data.Country);
      console.log("Language(s): " + response.data.Language);
      console.log("Plot: " + response.data.Plot);
      console.log("Actors: " + response.data.Actors);
      
      console.log("======================================")
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
}

//do-what-it-says
//pulls from random.txt: runs spotify-this song for "i want it that way"

function doWhatItSays() {
  fs.readFile('random.txt', 'utf8', function (error, data) {
    //console.log(data);
    var str = data.split(",");
    //console.log(str);
    command = str[0]
    input = str[1]
    menubar()


  });
}
