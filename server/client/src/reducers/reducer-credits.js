  
import { FETCH_CREDITS, ERROR_MESSAGE } from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_CREDITS:
      return action.payload;
    case ERROR_MESSAGE:
        return []
    default:
      return state;
  }
}