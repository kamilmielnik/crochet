import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import crochet from './crochet';
import newProject from './newProject';
import projects from './projects';
import tool from './tool';

const rootReducer = combineReducers({
  crochet,
  newProject,
  projects,
  routing: routerReducer,
  tool
});

export default rootReducer;
