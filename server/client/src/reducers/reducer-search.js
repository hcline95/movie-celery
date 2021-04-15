  
import { FETCH_MOVIES } from '../actions/types';

//saving search history in local storage
const initialState = JSON.parse(localStorage.getItem('savedSearch')) || {type:'movie', query:''};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_MOVIES:
      return action.payload.search;
    default:
      return state;
  }
}