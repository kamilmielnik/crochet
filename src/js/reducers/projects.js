import { reducer } from 'utils';
import { PROJECTS_LOAD } from 'constants/actionTypes';

const initialState = [];

export default reducer(
  initialState,
  {
    [PROJECTS_LOAD]: (state, action) => {
      const { projects } = action;
      return projects || initialState;
    }
  }
);
