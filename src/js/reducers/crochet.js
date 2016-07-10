import _ from 'underscore';
import { reducer } from 'utils';
import { TOOLS, TOOL_DELETE } from 'constants';
import {
  CROCHET_ADD_COLUMNS,
  CROCHET_ADD_ROWS,
  CROCHET_APPLY_TOOL,
  CROCHET_NEW
} from 'constants/actionTypes';

const initialState = {
  canvas: [],
  patterns: []
};

export default reducer(
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
      const tool = TOOLS[toolId];
      const currentValue = canvas[rowIndex][columnIndex];
      const newValue = {
        ...currentValue,
        ...tool
      };

      return {
        ...state,
        canvas: [
          ...canvas.slice(0, rowIndex),
          [
            ...canvas[rowIndex].slice(0, columnIndex),
            {
              ...canvas[rowIndex][columnIndex],
              ...tool
            },
            ...canvas[rowIndex].slice(columnIndex + 1)
          ],
          ...canvas.slice(rowIndex + 1)
        ]
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
);

function generateRows(numberOfRows, numberOfColumns) {
  return _.range(0, numberOfRows).map(() => generateRow(numberOfColumns));
}

function generateRow(numberOfColumns) {
  return _.range(0, numberOfColumns).map(generateCell);
}

function generateCell() {
  return TOOLS[TOOL_DELETE];
}
