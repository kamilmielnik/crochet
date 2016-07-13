import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import newProject from './newProject';
import projects from './projects';
import tool from './tool';

const rootReducer = combineReducers({
  newProject,
  projects,
  routing: routerReducer,
  tool
});

export default rootReducer;
