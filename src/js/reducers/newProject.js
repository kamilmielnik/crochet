import { reducer } from 'utils';
import {
  NEW_PROJECT_NAME_CHANGE,
  NEW_PROJECT_RESET
} from 'constants/actionTypes';

const initialState = {
  name: ''
};

export default reducer(
  initialState,
  {
    [NEW_PROJECT_NAME_CHANGE]: (state, action) => {
      const { name } = action;

      return {
        ...state,
        name
      };
    },

    [NEW_PROJECT_RESET]: () => initialState
  }
);
