import { CROCHET_DEFAULT_WIDTH, CROCHET_DEFAULT_HEIGHT } from 'constants';
import { ActionCreators as ReduxUndoActionCreators } from 'redux-undo';
import {
  CROCHET_ADD_COLUMNS,
  CROCHET_ADD_ROWS,
  CROCHET_APPLY_TOOL,
  CROCHET_MIRROR_HORIZONTAL,
  CROCHET_MIRROR_VERTICAL,
  CROCHET_NEW,
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

export function crochetNew(width = CROCHET_DEFAULT_WIDTH, height = CROCHET_DEFAULT_HEIGHT) {
  return {
    type: CROCHET_NEW,
    width,
    height
  };
}

export function toolChoose(toolId) {
  return {
    type: TOOL_CHOOSE,
    toolId
  };
}
