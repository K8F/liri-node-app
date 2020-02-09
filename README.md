# liri-node-app

## Introduction

LIRI is like iPhones SIRI, but instead of Speech Interpretation and Recognition Interface, LIRI is a Language Interpreation and Recognition Interface. In other words, LIRI works when users enter text commands via terminal. With LIRI, you can: 

* Search for upcoming concerts for an artist
* Find a song on spotify
* Find information about a movie
* Just for fun–run a secret command

Read this document to learn how to start using LIRI. 

## Setup

There are a couple of things you need to do before LIRI will work in your own command line. 

To set up LIRI: 

1. Get keys for the following APIs: 
    
    * Spotify
    * OMDB
    * BandsInTown
    
1. Clone the repository that includes this README: https://github.com/K8F/liri-node-app. 
1. Run npm install. The following packages should install: 

    * Node-Spotify-API
    * Axios (used to get data for OMDB and BandsInTown APIs)
    * Moment
    * DotEnv
    
    1. Create a .env file in the same directory. Add your API keys using the following format: 
        '# Spotify API keys'
        'SPOTIFY_ID=your-spotify-ID'
        'SPOTIFY_SECRET=your-spotify-secret'
        

       ' # Band API keys'
        'BANDSINTOWN_API_KEY=your-api-key'

        '# OMDB API keys'
        'OMDB_API_KEY=your-api-key'
        

        

