import _ from 'underscore';
import { CROCHET_SIZE_DEFAULT, TOOL_NONE } from 'constants';

export const initialState = {
  id: undefined,
  projectId: undefined,
  canvas: [],
  cellSize: CROCHET_SIZE_DEFAULT
};

export default {
  generate(id, projectId, numberOfRows, numberOfColumns) {
    const canvas = generateRows(numberOfRows, numberOfColumns);

    return {
      ...initialState,
      id,
      canvas,
      projectId
    };
  }
};

export function generateRows(numberOfRows, numberOfColumns) {
  return _.range(0, numberOfRows).map(() => generateRow(numberOfColumns));
}

export function generateRow(numberOfColumns) {
  return _.range(0, numberOfColumns).map(generateCell);
}

export function generateCell() {
  return TOOL_NONE;
}
