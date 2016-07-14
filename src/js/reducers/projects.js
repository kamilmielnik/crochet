import { reducer } from 'utils';
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

export default reducer(
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
);

function updateCrochet(state, action) {
  const updatedCrochet = crochet(state.crochet, action);
  const { present: { id } } = updatedCrochet;

  return {
    ...state,
    list: {
      ...state.list,
      [id]: forgetHistory(updatedCrochet)
    },
    crochet: updatedCrochet
  };
}

function forgetHistory(project) {
  const { present } = project;
  return {
    past: [],
    future: [],
    present
  };
}
