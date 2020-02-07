//require("dotenv").config();

//var keys = require("./keys.js");




//var spotify = new Spotify(keys.spotify);

//variable to read the command
var command=process.argv[2];
//variable that holds full string of user input
var input="";
//stores arguments in array;
var nodeArgs=process.argv;


//for loop that readys input for API string. 
for (var i = 3; i < nodeArgs.length; i++) {

  if (i > 3 && i < nodeArgs.length) {
    input = input + "+" + nodeArgs[i];
  } else {
    input += nodeArgs[i];

  }

}

//console.log(command,input);



//this needs to be written so that an entire string can be picked up



  //take in the following commands: 
  //concert-this
    //input: 'node liri.js concert-this <artist name>
    //api: Bands in Town Artist events API
    //"https://rest.bandisintown.com/artists" + artist + "/events?app_id=codingbootcamp" (note-codingbootcamp id works)

    //return: Name of venue, venue locatiion, dates of even (moment MM/DD/YYYY)

  //spotify-this-song
    //api:  [node-spotify-api](https://www.npmjs.com/package/node-spotify-api)
    //input: 'node liri.js spotify-this-song '<song name>'
    //return: artist, song name, preview link to spotify, album
    //if no song is provided, program returns: "The Sign" by Ace of Base.


  

  //movie-this
    //api: omdb api (key-trilogy), need axios package
    //input: node.liri.js movie-this 'movie name'
    //return: title, year, imdb rating, rotten tomatoes rating, country, language, plot, actors
    //if no movie is probided, return "mr nobody"
if (command="movie-this"){
    var axios = require("axios");
    //put this in a function {movieThis()}
    var queryURL = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy";

    //console.log(queryURL)

    axios.get(queryURL).then(
      function(response) {
        console.log("======================================")
        console.log ("Title: " + response.data.Title);
        console.log("Release Year: " + response.data.Year);
        console.log("IMDB Rating: " + response.data.imdbRating);
        //console.log(rotten tomatoes?)
        console.log("Country: " + response.data.Country);
        console.log ("Language(s): " + response.data.Language);
        console.log ("Plot: " + response.data.Plot);
        console.log ("Actors: " + response.data.Actors);
        console.log("======================================")

    
       })
      .catch(function(error) {
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
    //use fsvar fs = require("fs");
    //pulls from random.txt: runs spotify-this song for "i want it that way"

// fs is a core Node package for reading and writing files
//var fs = require("fs");

// This block of code will read from the "movies.txt" file.
// It's important to include the "utf8" parameter or the code will provide stream data (garbage)
// The code will store the contents of the reading inside the variable "data"
//fs.readFile("random.txt", "utf8", function(error, data) {

  // If the code experiences any errors it will log the error to the console.
  //if (error) {
    //return console.log(error);
  //}

  // We will then print the contents of data
  //console.log(data);

  // Then split it by commas (to make it more readable)
  //var dataArr = data.split(",");

  // We will then re-display the content as an array for later use.
  //console.log(dataArr);

//});
