import { combineReducers } from "redux";
import MoviesReducer from "./reducer-movies";
import TotalPagesReducer from "./reducer-total-pages";
import CurrentPageReducer from "./reducer-current-page";
import CreditsReducer from "./reducer-credits";
import SearchReducer from "./reducer-search";
import OrderReducer from "./reducer-order";

const rootReducer = combineReducers({
  movies: MoviesReducer,
  total_pages: TotalPagesReducer,
  current_page: CurrentPageReducer,
  credits: CreditsReducer,
  search: SearchReducer,
  order: OrderReducer,
});

export default rootReducer;

