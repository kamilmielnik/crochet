import _ from 'underscore';
import undoable from 'redux-undo';
import { reducer } from 'utils';
import { TOOLS, TOOL_NONE, UNDO_HISTORY_LIMIT } from 'constants';
import {
  CROCHET_ADD_COLUMNS,
  CROCHET_ADD_ROWS,
  CROCHET_APPLY_TOOL,
  CROCHET_MIRROR_HORIZONTAL,
  CROCHET_MIRROR_VERTICAL,
  CROCHET_NEW
} from 'constants/actionTypes';

const initialState = {
  canvas: []
};

export default undoable(reducer(
  initialState,
  {
    [CROCHET_ADD_COLUMNS]: (state, action) => {
      const { numberOfColumns } = action;
      const { canvas } = state;

      return {
        ...state,
        canvas: canvas.map(row => [
          ...row,
          ...generateRow(numberOfColumns)
        ])
      };
    },

    [CROCHET_ADD_ROWS]: (state, action) => {
      const { numberOfRows } = action;
      const { canvas } = state;
      const numberOfColumns = canvas[0].length;

      return {
        ...state,
        canvas: [
          ...canvas,
          ...generateRows(numberOfRows, numberOfColumns)
        ]
      };
    },

    [CROCHET_APPLY_TOOL]: (state, action) => {
      const { rowIndex, columnIndex, toolId } = action;
      const { canvas } = state;

      if (!canApplyTool(canvas, { rowIndex, columnIndex }, toolId)) {
        return state;
      }

      return {
        ...state,
        canvas: [
          ...canvas.slice(0, rowIndex),
          [
            ...canvas[rowIndex].slice(0, columnIndex),
            toolId,
            ...canvas[rowIndex].slice(columnIndex + 1)
          ],
          ...canvas.slice(rowIndex + 1)
        ]
      };
    },

    [CROCHET_MIRROR_HORIZONTAL]: state => {
      const { canvas } = state;
      const mirroredCanvas = canvas.map(row => [...row].reverse());

      return {
        ...state,
        canvas: mirroredCanvas
      };
    },

    [CROCHET_MIRROR_VERTICAL]: state => {
      const { canvas } = state;
      const mirroredCanvas = [...canvas].reverse();

      return {
        ...state,
        canvas: mirroredCanvas
      };
    },

    [CROCHET_NEW]: (state, action) => {
      const { width, height } = action;
      const canvas = generateRows(height, width);

      return {
        ...initialState,
        canvas
      };
    }
  }
), {
  limit: UNDO_HISTORY_LIMIT
});

function generateRows(numberOfRows, numberOfColumns) {
  return _.range(0, numberOfRows).map(() => generateRow(numberOfColumns));
}

function generateRow(numberOfColumns) {
  return _.range(0, numberOfColumns).map(generateCell);
}

function generateCell() {
  return TOOL_NONE;
}

function canApplyTool(canvas, { rowIndex, columnIndex }, toolId) {
  if (isRemoveTool(toolId)) {
    return true;
  }

  if (isOtherToolUsedAlready(canvas, rowIndex, columnIndex)) {
    return false;
  }

  const { width, height } = TOOLS[toolId];

  if (width === 2) {
    return [
      !areLeftOrUpperNeighborsBlocking(canvas, rowIndex, columnIndex),
      !isRightNeighborBlocking(canvas, rowIndex, columnIndex)
    ].every(Boolean);
  }

  if (height === 2) {
    return [
      !areLeftOrUpperNeighborsBlocking(canvas, rowIndex, columnIndex),
      !isBottomNeighborBlocking(canvas, rowIndex, columnIndex)
    ].every(Boolean);
  }

  return !areLeftOrUpperNeighborsBlocking(canvas, rowIndex, columnIndex);
}

function isRemoveTool(toolId) {
  return toolId === TOOL_NONE;
}

function isOtherToolUsedAlready(canvas, rowIndex, columnIndex) {
  return canvas[rowIndex][columnIndex] !== TOOL_NONE;
}

function areLeftOrUpperNeighborsBlocking(canvas, rowIndex, columnIndex) {
  return [
    isLeftNeighborBlocking(canvas, rowIndex, columnIndex),
    isUpperNeighborBlocking(canvas, rowIndex, columnIndex)
  ].some(Boolean);
}

function isLeftNeighborBlocking(canvas, rowIndex, columnIndex) {
  if (columnIndex === 0) {
    return false;
  }

  const toolId = canvas[rowIndex][columnIndex - 1];
  const { width } = TOOLS[toolId];

  return width === 2;
}

function isUpperNeighborBlocking(canvas, rowIndex, columnIndex) {
  if (rowIndex === 0) {
    return false;
  }

  const toolId = canvas[rowIndex - 1][columnIndex];
  const { height } = TOOLS[toolId];

  return height === 2;
}

function isRightNeighborBlocking(canvas, rowIndex, columnIndex) {
  if (columnIndex === canvas[0].length - 1) {
    return true;
  }

  return canvas[rowIndex][columnIndex + 1] !== TOOL_NONE;
}

function isBottomNeighborBlocking(canvas, rowIndex, columnIndex) {
  if (rowIndex === canvas.length - 1) {
    return true;
  }

  return canvas[rowIndex + 1][columnIndex] !== TOOL_NONE;
}
