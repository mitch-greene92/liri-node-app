//------------------Initial Configuration & package requirements--------------------------

//require the dotenv package
require("dotenv").config();

//require user API keys from the keys.js file
var keys = require("./keys.js");

//define Spotify API
var Spotify = require('node-spotify-api');

//access keys information 
var spotify = new Spotify(keys.spotify);

//require fs for the .txt file system
var fs = require('fs');

//require moment for node & utilize default format
var moment = require('moment');
moment().format();
//require axios to pull BandsInTown and OMDB API data
var axios = require('axios');

//------------------Search Terms--------------------------
var liriChoice = process.argv[2];
var searchTerm = process.argv[3];

//------------------Switch Statement for liri choice--------------------------
switch (liriChoice) {
    case "do-what-it-says":
        doWhatItSays(searchTerm);
        break;
    case "movie-this":
        movieThis(searchTerm);
        break;
    case "concert-this":
        concertThis(searchTerm);
        break;
    case "spotify-this-song":
        spotifyThisSong(searchTerm);
        break;
};

//movie-this switch function 
function movieThis(searchTerm) {
    if(!searchTerm){
        searchTerm = "Mr. Nobody";
    }
    axios.get("https://www.omdbapi.com/?t="+searchTerm+"&y=&plot=short&apikey=trilogy").then(function(response){
        var movieReturn = 
        "\n----------------------------------"+
        "\nMovie Title: "+response.data.Title+
        "\nDirector: "+response.data.Director+
        "\nYear Released: "+response.data.Year+
        "\nIMDB Rating: "+response.data.imdbRating+
        "\nRotten Tomatoes Percentage: "+response.data.Ratings[1].Value+
        "\nProduction Country: "+response.data.Country+
        "\nLanguage(s) of Movie: "+response.data.Language+
        "\nShort Plot Description: "+response.data.Plot+
        "\nStarring Actor(s) & Actress(es): "+response.data.Actors+
        "\n----------------------------------"

        console.log(movieReturn);
    }).catch(function(error){
        console.log(error);
    });
}

//spotify-this-song switch function
function spotifyThisSong(searchTerm) {
    if(!searchTerm) {
        searchTerm = "The Sign";
    }
    spotify.search({type: 'track', query: searchTerm}).then(function(response) {
        for (var j=0;j<3;j++) {
            var spotifyReturn =
            "\n----------------------------------"+
            "\nArtist(s): "+response.tracks.items[j].artists[0].name+
            "\nSong Title: " +response.tracks.items[j].name+
            "\nPreview URL: "+response.tracks.items[j].preview_url;
            "\nAlbum Title: "+response.tracks.items[j].album.name+
            console.log(spotifyReturn);
        }
    }).catch(function(error){
        console.log(error);   
    });
}

//concert-this switch function
function concertThis(searchTerm){
    axios.get("https://rest.bandsintown.com/artists/"+searchTerm+"/events?app_id=codingbootcamp").then(function(response) {
        for (var j=0;j < response.data.length; j++) {
            var concertDate = response.data[j].datetime;
            var dataArray = concertDate.split('T');
            var concertReturn =
            "\n----------------------------------"+
            "\nConcert: "+searchTerm+
            "\nName of Venue: "+response.data[j].venue.name+
            "\nLocation of Venue: "+response.data[j].venue.city+
            "\nDate of Event: "+moment(dataArray[0]).format('MM-DD-YYYY')
            console.log(concertReturn);
        }
    }).catch(function(error){
        console.log(error);
    });
}

//do-what-it-says switch function
function doWhatItSays() {
    fs.readFile("./random.txt","utf8", function(error, data) {
        if (error) {
            console.log(error);
        }
        var dataArray = data.split(',');
        console.log(dataArray);
        if(dataArray[0]=='spotify-this-song') {
        console.log(spotifyThisSong(dataArray[1]));
        }
        else if (dataArray[0]=='concert-this')
        {
        console.log(concertThis(dataArray[1]));
        }
        else if (dataArray[0]=='movie-this')
        {
        console.log(movieThis(dataArray[1]));
        }
        else return error;
    })
}

