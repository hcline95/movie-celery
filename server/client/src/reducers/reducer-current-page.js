import { FETCH_MOVIES, ERROR_MESSAGE } from '../actions/types';

export default function(state = 0, action) {
  switch (action.type) {
    case FETCH_MOVIES:
      return action.payload.data.page
    case ERROR_MESSAGE:
      return 0
    default:
      return state;
  }
}
