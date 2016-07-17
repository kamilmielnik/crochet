import { reducer } from 'utils';
import { HANDLE_ERROR } from 'constants/actionTypes';

const initialState = '';

export default reducer(
  initialState,
  {
    [HANDLE_ERROR]: (state, action) => {
      const { error } = action;
      return error;
    }
  }
);
