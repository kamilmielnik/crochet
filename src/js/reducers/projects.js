import undoable from 'redux-undo';
import { reducer } from 'utils';
import { UNDO_HISTORY_LIMIT } from 'constants';
import {
  CROCHET_ADD_COLUMNS,
  CROCHET_ADD_ROWS,
  CROCHET_APPLY_TOOL,
  CROCHET_CELL_SIZE_CHANGE,
  CROCHET_MIRROR_HORIZONTAL,
  CROCHET_MIRROR_VERTICAL,
  CROCHET_NEW,
  PROJECT_OPEN
} from 'constants/actionTypes';
import crochet from './crochet';

const initialState = {
  list: {},
  crochet: crochet()
};

export default undoable(reducer(
  initialState,
  {
    [CROCHET_ADD_COLUMNS]: updateCrochet,
    [CROCHET_ADD_ROWS]: updateCrochet,
    [CROCHET_APPLY_TOOL]: updateCrochet,
    [CROCHET_CELL_SIZE_CHANGE]: updateCrochet,
    [CROCHET_MIRROR_HORIZONTAL]: updateCrochet,
    [CROCHET_MIRROR_VERTICAL]: updateCrochet,
    [CROCHET_NEW]: updateCrochet,

    [PROJECT_OPEN]: (state, action) => {
      const { id } = action;
      const { list: projects } = state;
      const project = projects[id];

      return {
        ...state,
        crochet: project
      };
    }
  }
), {
  limit: UNDO_HISTORY_LIMIT
});

function updateCrochet(state, action) {
  const updatedCrochet = crochet(state.crochet, action);
  const { id } = updatedCrochet;

  return {
    ...state,
    list: {
      ...state.list,
      [id]: updatedCrochet
    },
    crochet: updatedCrochet
  };
}
