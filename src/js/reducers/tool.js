import { reducer } from 'utils';
import { TOOLS, TOOL_SQUARE_EMPTY } from 'constants';
import {
  CROCHET_NEW,
  TOOL_CHOOSE,
  TOOLS_DROPDOWN_HIDE,
  TOOLS_DROPDOWN_SHOW
} from 'constants/actionTypes';

const initialState = {
  ...TOOLS[TOOL_SQUARE_EMPTY],
  isToolsDropdownShown: false
};

export default reducer(
  initialState,
  {
    [CROCHET_NEW]: () => initialState,

    [TOOL_CHOOSE]: (state, action) => {
      const { toolId } = action;
      return {
        ...TOOLS[toolId],
        isToolsDropdownShown: state.isToolsDropdownShown
      };
    },

    [TOOLS_DROPDOWN_HIDE]: state => ({
      ...state,
      isToolsDropdownShown: false
    }),

    [TOOLS_DROPDOWN_SHOW]: state => ({
      ...state,
      isToolsDropdownShown: true
    })
  }
);
