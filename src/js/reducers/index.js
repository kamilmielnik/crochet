import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import crochet from './crochet';
import tool from './tool';

const rootReducer = combineReducers({
  crochet,
  routing: routerReducer,
  tool
});

export default rootReducer;
