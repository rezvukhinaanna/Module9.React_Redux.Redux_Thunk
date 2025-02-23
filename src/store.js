import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import { fieldReducer, informationReducer } from "./reducers";
import { thunk } from "redux-thunk";

const reducer = combineReducers({
  fieldState: fieldReducer,
  informationState: informationReducer,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk))
);
