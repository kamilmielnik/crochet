import { CROCHET_DEFAULT_WIDTH, CROCHET_DEFAULT_HEIGHT } from 'constants';
import {
  CROCHET_ADD_COLUMNS,
  CROCHET_ADD_ROWS,
  CROCHET_APPLY_TOOL,
  CROCHET_NEW,
  TOOL_CHOOSE
} from 'constants/actionTypes';

export { push as redirect } from 'react-router-redux';

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
