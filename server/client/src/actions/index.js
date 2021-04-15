import axios from "axios";
import { FETCH_MOVIES, FETCH_CREDITS, ERROR_MESSAGE} from './types';

//List of all movies
export const fetchAllMovies =  (page = 1) => dispatch => {
  axios.get(`/movies?page=${page}`
  ).then(function (response) {
    dispatch({ type: FETCH_MOVIES, payload: {data: response.data, search : { type : 'movie', query: '' }}});
  })
  .catch(function (error) {
    dispatch({ type: ERROR_MESSAGE, payload: error });
  });
};

//Searches for movies with a specific cast/crew member or specific word in title
  export const fetchSearch = (type, query, page) => dispatch => {
    axios.get(`/search?type=${type}&search=${query}&page=${page}`
    ).then(function (response) {
      dispatch({ type: FETCH_MOVIES, payload: { data: response.data, search : {type: type, query: query }}});
    })
    .catch(function (error) {
      dispatch({ type: ERROR_MESSAGE, payload: error });
    });
  };

//Request specific movies cast and crew information
export const fetchCredits = (movieId) => dispatch => {
  axios.get(`/${movieId}`
  ).then(function (response) {
    dispatch({ type: FETCH_CREDITS, payload: response.data });
  })
  .catch(function (error) {
    dispatch({ type: ERROR_MESSAGE, payload: error });
    console.log(error);
  });
};




