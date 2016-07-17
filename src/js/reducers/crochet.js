import undoable from 'redux-undo';
import { reducer } from 'utils';
import { generateRow, generateRows, initialState } from 'models/crochet';
import { TOOLS, TOOL_NONE, UNDO_HISTORY_LIMIT } from 'constants';
import {
  CROCHET_ADD_COLUMNS,
  CROCHET_ADD_ROWS,
  CROCHET_APPLY_TOOL,
  CROCHET_CELL_SIZE_CHANGE,
  CROCHET_HIGHLIGHT_EMPTY,
  CROCHET_LOAD,
  CROCHET_MIRROR_HORIZONTAL,
  CROCHET_MIRROR_VERTICAL,
  CROCHET_NEW
} from 'constants/actionTypes';

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
      const {
        rowIndex: originalRowIndex,
        columnIndex: originalColumnIndex,
        toolId
      } = action;
      const { canvas } = state;
      let rowIndex = originalRowIndex;
      let columnIndex = originalColumnIndex;

      if (!canApplyTool(canvas, { rowIndex, columnIndex }, toolId)) {
        return state;
      }

      if (toolId === TOOL_NONE) {
        if (isLeftNeighborBlocking(canvas, originalRowIndex, originalColumnIndex)) {
          columnIndex -= 1;
        }
        if (isUpperNeighborBlocking(canvas, originalRowIndex, originalColumnIndex)) {
          rowIndex -= 1;
        }
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

    [CROCHET_CELL_SIZE_CHANGE]: (state, action) => {
      const { cellSize } = action;

      return {
        ...state,
        cellSize
      };
    },

    [CROCHET_HIGHLIGHT_EMPTY]: (state, action) => {
      const { shouldEmptyCellsBeHighlighted } = action;
      return {
        ...state,
        areEmptyCellsHighlighted: shouldEmptyCellsBeHighlighted
      };
    },

    [CROCHET_LOAD]: (state, action) => {
      const { crochet } = action;
      return {
        ...initialState,
        ...crochet
      };
    },

    [CROCHET_MIRROR_HORIZONTAL]: state => {
      const { canvas } = state;
      const mirroredCanvas = canvas.map(row => [...row].reverse());
      const shiftedCanvas = mirroredCanvas.map(row => {
        const shiftedRow = [...row];
        row.forEach((toolId, columnIndex) => {
          const { width, mirrorHorizontal } = TOOLS[toolId];
          if (mirrorHorizontal) {
            shiftedRow[columnIndex] = mirrorHorizontal;
          }

          if (width === 2) {
            shiftedRow[columnIndex] = row[columnIndex - 1];
            shiftedRow[columnIndex - 1] = toolId;
          }
        });
        return shiftedRow;
      });

      return {
        ...state,
        canvas: shiftedCanvas
      };
    },

    [CROCHET_MIRROR_VERTICAL]: state => {
      const { canvas } = state;
      const mirroredCanvas = [...canvas].reverse().map(row => [...row]);
      mirroredCanvas.forEach((row, rowIndex) => {
        row.forEach((toolId, columnIndex) => {
          const { height, mirrorVertical } = TOOLS[toolId];
          if (mirrorVertical) {
            row[columnIndex] = mirrorVertical;
          }

          if (height === 2) {
            row[columnIndex] = mirroredCanvas[rowIndex - 1][columnIndex];
            mirroredCanvas[rowIndex - 1][columnIndex] = toolId;
          }
        });
      });

      return {
        ...state,
        canvas: mirroredCanvas
      };
    },

    [CROCHET_NEW]: (state, action) => {
      const { crochet } = action;
      return {
        ...initialState,
        ...crochet
      };
    }
  }
), {
  limit: UNDO_HISTORY_LIMIT
});

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
      !isRightNeighborBlocking(canvas, rowIndex, columnIndex),
      !isTopRightNeighborBlocking(canvas, rowIndex, columnIndex)
    ].every(Boolean);
  }

  if (height === 2) {
    return [
      !areLeftOrUpperNeighborsBlocking(canvas, rowIndex, columnIndex),
      !isBottomNeighborBlocking(canvas, rowIndex, columnIndex),
      !isBottomLeftNeighborBlocking(canvas, rowIndex, columnIndex)
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

function isTopRightNeighborBlocking(canvas, rowIndex, columnIndex) {
  if (rowIndex === 0) {
    return false;
  }

  if (columnIndex === canvas[0].length - 1) {
    return false;
  }

  const topRightToolId = canvas[rowIndex - 1][columnIndex + 1];
  const { height: topRightToolHeight } = TOOLS[topRightToolId];
  return topRightToolHeight === 2;
}

function isBottomNeighborBlocking(canvas, rowIndex, columnIndex) {
  if (rowIndex === canvas.length - 1) {
    return true;
  }

  return canvas[rowIndex + 1][columnIndex] !== TOOL_NONE;
}

function isBottomLeftNeighborBlocking(canvas, rowIndex, columnIndex) {
  if (rowIndex === canvas.length - 1) {
    return false;
  }

  if (columnIndex === 0) {
    return false;
  }

  const bottomLeftToolId = canvas[rowIndex + 1][columnIndex - 1];
  const { width: bottomLeftToolWidth } = TOOLS[bottomLeftToolId];
  return bottomLeftToolWidth === 2;
}
