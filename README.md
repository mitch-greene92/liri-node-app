# liri-node-app

**Created by: `Mitch Greene`**

**Date: `April 2020`**

---

## <h2>Overview/Purpose</h2>
The Liri Node App aims to create a command line interface method to search for songs, artists, concerts in your area and movies utilizing a variety of APIs. The app also includes the ability to 

The app requires a user to utilize their .env with spotify and requires node, fs, axios, node spotify API, dotenv and moment to work properly. 

## <h2>How to use the LIRI node app</h2>
There are four commands that LIRI can use:
* `'concert-this'`
* `'spotify-this-song'`
* `'movie-this'`
* `'do-what-it-says'`

**Step 1: Open terminal or bash**

**Step 2: Navigate to folder where liri.js is contained**

**Step 3: Ensure all packages listed above have been installed.**

**Step 4: Input your use for LIRI**

**Examples:**

Example 1: 'spotify-this-song'

command: `node liri.js spotify-this-song "song"`

Spotify will then return the 3 closest matching songs

![Screenshots](/screenshots/spotify.png)

---

Example 2: 'movie-this'
command: `node liri.js movie-this "movie"`

Information about the movie from the OMDB API will show

![Screenshots](/screenshots/movie.png)

---

Example 3: 'concert-this'
command: `node liri.js concert-this "artist"`

Information about concerts and dates with that aritist will appear

![Screenshots](/screenshots/concert.png)

---

Example 4: 'do-what-it-says'
command: `node liri.js do-what-it-says`

This command takes information in the `random.txt` file and separates it into an array and will do whatever command and search term is inside the file.

![Screenshots](/screenshots/dowhat.png)

---
<h2>Technologies Used</h2>

<h3>API's used</h3>
`OMDB, Spotify, BandsInTown`

<h3>Node packages used</h3>
`fs, axios, moment, spotify-node-api, dotenv`
