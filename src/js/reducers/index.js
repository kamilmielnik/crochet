import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import crochet from './crochet';

const rootReducer = combineReducers({
  crochet,
  routing: routerReducer
});

export default rootReducer;
