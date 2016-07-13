import { CROCHET_DEFAULT_COLUMNS, CROCHET_DEFAULT_ROWS } from 'constants';
import { ActionCreators as ReduxUndoActionCreators } from 'redux-undo';
import {
  CROCHET_ADD_COLUMNS,
  CROCHET_ADD_ROWS,
  CROCHET_APPLY_TOOL,
  CROCHET_CELL_SIZE_CHANGE,
  CROCHET_MIRROR_HORIZONTAL,
  CROCHET_MIRROR_VERTICAL,
  CROCHET_NEW,
  NEW_PROJECT_NAME_CHANGE,
  NEW_PROJECT_RESET,
  PROJECT_OPEN,
  TOOL_CHOOSE
} from 'constants/actionTypes';

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

export function crochetNew(id, name, width = CROCHET_DEFAULT_COLUMNS, height = CROCHET_DEFAULT_ROWS) {
  return {
    type: CROCHET_NEW,
    id,
    name,
    width,
    height
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

export function projectOpen(id) {
  return {
    type: PROJECT_OPEN,
    id
  };
}

export function toolChoose(toolId) {
  return {
    type: TOOL_CHOOSE,
    toolId
  };
}
