const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const axios = require('axios')
const baseURL = 'https://api.themoviedb.org/3/'
const apiKey = 'api_key=949bff8e08031ca57f596f86e7440dde'

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build'));
  });
}


//returns all movies 
app.get('/movies', (req, res) => {
    axios.get(`${baseURL}discover/movie?${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${req.query.page}`
    ).then(function (response) {
      res.send(response.data)
    })
    .catch(function (error) {
        res.status(404);
        return res.end(`Sorry, request could not be made. Please try again later.`);
    });
  });


  //returns results for specific search query
  app.get('/search', (req, res) => {
    //if user searched for a movie
    if(req.query.search === undefined){
        res.status(404);
        return res.end(`Please enter a search term.`);
    }else if (req.query.type === 'movie'){
        axios.get(`${baseURL}search/movie?${apiKey}&query=${req.query.search}&page=${req.query.page}`
        ).then(function (response) {
            res.send(response.data)
        })
        .catch(function (error) {
            res.status(404);
            return res.end(`Sorry, request could not be made. Please try again later.`);
        });
    //if user search people
    }else if (req.query.type === 'person'){
        //finds the persons ID number
        axios.get(`${baseURL}search/person?${apiKey}&query=${req.query.search}`
        ).then(function (response) {
            //if Id number is found requests all their movies
            axios.get(`${baseURL}discover/movie?${apiKey}&with_cast=${response.data.results[0].id}&page=${req.query.page}`
            ).then(function (response) {
                res.send(response.data)
            })
            .catch(function (error) {
                res.status(404);
                return res.end(`No movies with that actor were found.`);
            });  
        })
        .catch(function (error) {
            res.status(404);
            return res.end(`Person with the name ${req.query.search} could not be found`);
        });
    }
  });

  //gets movie credits
  app.get('/:movieId', (req, res) => {
    //if invalid id number is sent
    if (isNaN(req.params.movieId) == true){
        res.status(404);
        return res.end(`Id must be a number.`);
    }
    axios.get(`${baseURL}movie/${req.params.movieId}/credits?${apiKey}&language=en-US`
    ).then(function (response) {
        res.send(response.data)
    })
    .catch(function (error) {
        res.status(404);
        return res.end(`No movie with id number ${req.params.movieId} could be found.`);
    });
  })



// Server Setup
const port = process.env.PORT || 5000;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);
