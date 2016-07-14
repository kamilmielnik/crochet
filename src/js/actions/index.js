import _ from 'underscore';
import { CROCHET_DEFAULT_NUMBER_OF_COLUMNS, CROCHET_DEFAULT_NUMBER_OF_ROWS } from 'constants';
import { ActionCreators as ReduxUndoActionCreators } from 'redux-undo';
import storage from 'storage';
import {
  CROCHET_ADD_COLUMNS,
  CROCHET_ADD_ROWS,
  CROCHET_APPLY_TOOL,
  CROCHET_CELL_SIZE_CHANGE,
  CROCHET_LOAD,
  CROCHET_MIRROR_HORIZONTAL,
  CROCHET_MIRROR_VERTICAL,
  CROCHET_NEW,
  NEW_PROJECT_NAME_CHANGE,
  NEW_PROJECT_RESET,
  PROJECTS_LOAD,
  TOOL_CHOOSE
} from 'constants/actionTypes';
import { crochetModel, projectModel } from 'models';

export { push as redirect } from 'react-router-redux';
export const redo = ReduxUndoActionCreators.redo;
export const undo = ReduxUndoActionCreators.undo;

export function crochetAddColumns(numberOfColumns) {
  return {
    type: CROCHET_ADD_COLUMNS,
    numberOfColumns
  };
}

export function crochetAddRows(numberOfRows) {
  return {
    type: CROCHET_ADD_ROWS,
    numberOfRows
  };
}

export function crochetApplyTool(rowIndex, columnIndex, toolId) {
  return {
    type: CROCHET_APPLY_TOOL,
    rowIndex,
    columnIndex,
    toolId
  };
}

export function crochetCellSizeChange(cellSize) {
  return {
    type: CROCHET_CELL_SIZE_CHANGE,
    cellSize
  };
}

export function crochetLoad(id) {
  return dispatch => {
    const crochet = storage.getItem(id);

    dispatch({
      type: CROCHET_LOAD,
      crochet
    });
  };
}

export function crochetMirrorHorizontal() {
  return {
    type: CROCHET_MIRROR_HORIZONTAL
  };
}

export function crochetMirrorVertical() {
  return {
    type: CROCHET_MIRROR_VERTICAL
  };
}

export function projectNew(projectData, callback) {
  const {
    projectId,
    crochetId,
    name,
    numberOfRows = CROCHET_DEFAULT_NUMBER_OF_ROWS,
    numberOfColumns = CROCHET_DEFAULT_NUMBER_OF_COLUMNS
  } = projectData;

  const crochet = crochetModel.generate(crochetId, projectId, numberOfRows, numberOfColumns);
  const project = projectModel.generate(projectId, crochetId, name);

  return dispatch => {
    const projects = storage.getItem('projects', []);
    projects.push(project);
    storage.setItem('projects', projects);

    dispatch(
      crochetSave(crochetId, crochet, () => {
        dispatch({
          type: CROCHET_NEW,
          crochet
        });

        callback(dispatch);
      })
    );
  };
}

export function crochetSave(id, crochet, callback = _.noop) {
  return dispatch => {
    storage.setItem(id, crochet);
    callback(dispatch);
  };
}

export function newProjectNameChange(name) {
  return {
    type: NEW_PROJECT_NAME_CHANGE,
    name
  };
}

export function newProjectReset() {
  return {
    type: NEW_PROJECT_RESET
  };
}

export function projectsLoad() {
  return dispatch => {
    const projects = storage.getItem('projects');

    dispatch({
      type: PROJECTS_LOAD,
      projects
    });
  };
}

export function toolChoose(toolId) {
  return {
    type: TOOL_CHOOSE,
    toolId
  };
}
