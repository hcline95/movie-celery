import { FETCH_MOVIES, ERROR_MESSAGE } from '../actions/types';
import { normalize, schema } from 'normalizr';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_MOVIES:

      //orders the movie id's

      const movieSchema = new schema.Entity('movies');

      const movieListSchema = new schema.Array(movieSchema);

      const normalizedOrder = normalize(action.payload.data.results, movieListSchema).result
      
      //resets the state if it is a new search, if it is not the first page it adds to the state
      return action.payload.data.page === 1 ? [...normalizedOrder] : [...state, ...normalizedOrder]
    case ERROR_MESSAGE:
        return []
    default:
      return state;
  }
}
