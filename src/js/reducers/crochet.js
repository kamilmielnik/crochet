import { reducer, undoable } from 'utils';
import { generateRow, generateRows, initialState } from 'models/crochet';
import { TOOLS, TOOL_NONE, UNDO_HISTORY_LIMIT } from 'constants';
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
        toolId,
        isLeftNeighborBlocking,
        isUpperNeighborBlocking
      } = action;
      const { canvas } = state;
      let rowIndex = originalRowIndex;
      let columnIndex = originalColumnIndex;


      if (toolId === TOOL_NONE) {
        if (isLeftNeighborBlocking) {
          columnIndex -= 1;
        }
        if (isUpperNeighborBlocking) {
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

    [CROCHET_DELETE_COLUMNS]: (state, action) => {
      const { numberOfColumns } = action;
      const { canvas } = state;
      const currentNumberOfColumns = canvas[0].length;

      return {
        ...state,
        canvas: canvas.map(row => row.slice(0, currentNumberOfColumns - numberOfColumns))
      };
    },

    [CROCHET_DELETE_ROWS]: (state, action) => {
      const { numberOfRows } = action;
      const { canvas } = state;
      const currentNumberOfRows = canvas.length;

      return {
        ...state,
        canvas: canvas.slice(0, currentNumberOfRows - numberOfRows)
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
  limit: UNDO_HISTORY_LIMIT,
  resettingActions: [CROCHET_NEW, CROCHET_LOAD]
});

