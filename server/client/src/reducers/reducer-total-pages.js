import { FETCH_MOVIES, ERROR_MESSAGE } from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_MOVIES:
      return action.payload.data.total_pages
    case ERROR_MESSAGE:
      return 0
    default:
      return state;
  }
}
