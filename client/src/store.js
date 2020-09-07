import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from 'redux-thunk';
import reducers from './redux/reducers';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(reduxThunk))
);