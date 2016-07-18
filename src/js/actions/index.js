import _ from 'underscore';
import {
  CROCHET_DEFAULT_NUMBER_OF_COLUMNS, CROCHET_DEFAULT_NUMBER_OF_ROWS,
  TOOL_NONE
} from 'constants';
import { push } from 'react-router-redux';
import storage from 'storage';
import {
  CROCHET_ADD_COLUMNS,
  CROCHET_ADD_ROWS,
  CROCHET_APPLY_TOOL,
  CROCHET_CELL_SIZE_CHANGE,
  CROCHET_DELETE_COLUMNS,
  CROCHET_DELETE_ROWS,
  CROCHET_HIGHLIGHT_EMPTY,
  CROCHET_LOAD,
  CROCHET_MIRROR_HORIZONTAL,
  CROCHET_MIRROR_VERTICAL,
  CROCHET_NEW,
  HANDLE_ERROR,
  NEW_PROJECT_NAME_CHANGE,
  NEW_PROJECT_RESET,
  PROJECTS_LOAD,
  TOOL_CHOOSE,
  UNDOABLE_REDO,
  UNDOABLE_UNDO
} from 'constants/actionTypes';
import { crochetModel, projectModel } from 'models';
import { isLeftNeighborBlocking, isUpperNeighborBlocking } from 'models/collisions';

export const redirect = push;

export function crochetAddColumns(numberOfColumns) {
  return {
    type: CROCHET_ADD_COLUMNS,
    numberOfColumns,
    reverseAction: {
      type: CROCHET_DELETE_COLUMNS,
      numberOfColumns
    }
  };
}

export function crochetAddRows(numberOfRows) {
  return {
    type: CROCHET_ADD_ROWS,
    numberOfRows,
    reverseAction: {
      type: CROCHET_DELETE_ROWS,
      numberOfRows
    }
  };
}

export function crochetApplyTool(canvas, rowIndex, columnIndex, toolId) {
  if (toolId === TOOL_NONE) {
    return crochetApplyRubberTool(canvas, rowIndex, columnIndex);
  }

  return {
    type: CROCHET_APPLY_TOOL,
    rowIndex,
    columnIndex,
    toolId,
    isLeftNeighborBlocking: isLeftNeighborBlocking(canvas, rowIndex, columnIndex),
    isUpperNeighborBlocking: isUpperNeighborBlocking(canvas, rowIndex, columnIndex),
    reverseAction: {
      type: CROCHET_APPLY_TOOL,
      rowIndex,
      columnIndex,
      toolId: TOOL_NONE,
      isLeftNeighborBlocking: false,
      isUpperNeighborBlocking: false
    }
  };
}

export function crochetApplyRubberTool(canvas, rowIndex, columnIndex) {
  let reverseRowIndex = rowIndex;
  let reverseColumnIndex = columnIndex;

  if (isLeftNeighborBlocking(canvas, rowIndex, columnIndex)) {
    reverseColumnIndex = columnIndex - 1;
  }

  if (isUpperNeighborBlocking(canvas, rowIndex, columnIndex)) {
    reverseRowIndex = rowIndex - 1;
  }

  const reverseTool = canvas[reverseRowIndex][reverseColumnIndex];

  return {
    type: CROCHET_APPLY_TOOL,
    rowIndex,
    columnIndex,
    toolId: TOOL_NONE,
    isLeftNeighborBlocking: isLeftNeighborBlocking(canvas, rowIndex, columnIndex),
    isUpperNeighborBlocking: isUpperNeighborBlocking(canvas, rowIndex, columnIndex),
    reverseAction: {
      type: CROCHET_APPLY_TOOL,
      rowIndex: reverseRowIndex,
      columnIndex: reverseColumnIndex,
      toolId: reverseTool,
      isLeftNeighborBlocking: false,
      isUpperNeighborBlocking: false
    }
  };
}

export function crochetCellSizeChange(cellSize) {
  return {
    type: CROCHET_CELL_SIZE_CHANGE,
    cellSize
  };
}

export function crochetDeleteColumns(numberOfColumns) {
  return {
    type: CROCHET_DELETE_COLUMNS,
    numberOfColumns
  };
}

export function crochetDeleteRows(numberOfRows) {
  return {
    type: CROCHET_DELETE_ROWS,
    numberOfRows
  };
}

export function crochetHighlightEmpty(shouldEmptyCellsBeHighlighted) {
  return {
    type: CROCHET_HIGHLIGHT_EMPTY,
    shouldEmptyCellsBeHighlighted
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
    type: CROCHET_MIRROR_HORIZONTAL,
    reverseAction: {
      type: CROCHET_MIRROR_HORIZONTAL
    }
  };
}

export function crochetMirrorVertical() {
  return {
    type: CROCHET_MIRROR_VERTICAL,
    reverseAction: {
      type: CROCHET_MIRROR_VERTICAL
    }
  };
}

export function projectDelete(projectId) {
  return dispatch => {
    const projects = storage.getItem('projects', []);
    const index = projects.findIndex(project => project.id === projectId);
    const { crochetId } = projects[index];
    const newProjects = [
      ...projects.slice(0, index),
      ...projects.slice(index + 1)
    ];

    storage.setItem('projects', newProjects);
    storage.removeItem(projectId);
    storage.removeItem(crochetId);

    dispatch(projectsLoad());
  };
}

export function projectNew(projectData, callback = _.noop) {
  const {
    projectId,
    crochetId,
    name,
    numberOfRows = CROCHET_DEFAULT_NUMBER_OF_ROWS,
    numberOfColumns = CROCHET_DEFAULT_NUMBER_OF_COLUMNS,
    crochet = crochetModel.generate(crochetId, projectId, numberOfRows, numberOfColumns),
    project = projectModel.generate(projectId, crochetId, name)
  } = projectData;

  return dispatch => {
    const projects = storage.getItem('projects', []);
    const projectsWithoutOld = projects.filter(({ id }) => id !== projectId);
    projectsWithoutOld.push(project);
    storage.setItem('projects', projectsWithoutOld);

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

export function handleError(error) {
  return dispatch => {
    dispatch({
      type: HANDLE_ERROR,
      error
    });

    dispatch(redirect('blad'));
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

export function undoableRedo() {
  return {
    type: UNDOABLE_REDO
  };
}

export function undoableUndo() {
  return {
    type: UNDOABLE_UNDO
  };
}
