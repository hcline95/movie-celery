import { FETCH_MOVIES, ERROR_MESSAGE } from '../actions/types';
import { normalize, schema } from 'normalizr';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_MOVIES:

      //normalizes the data to make it easier to find by ID
      const movie = new schema.Entity('movies');
    
      const mySchema = { results: [ movie ]};

      const normalizedMovies = normalize(action.payload.data, mySchema).entities.movies;
  
      //resets the state if it is a new search, if it is not the first page it adds to the state for the infinite scroll
      return action.payload.data.page === 1 ? {...normalizedMovies} : {...normalizedMovies, ...state} 
    case ERROR_MESSAGE:
      return []
    default:
      return state;
  }
}
