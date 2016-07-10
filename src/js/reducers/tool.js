import _ from 'underscore';
import { reducer } from 'utils';
import { TOOLS, TOOL_SQUARE_EMPTY } from 'constants';
import {
  CROCHET_NEW,
  TOOL_CHOOSE
} from 'constants/actionTypes';

const initialState = TOOLS[TOOL_SQUARE_EMPTY];

export default reducer(
  initialState,
  {
    [CROCHET_NEW]: () => initialState,

    [TOOL_CHOOSE]: (state, action) => {
      const { toolId } = action;
      return TOOLS[toolId];
    }
  }
);
