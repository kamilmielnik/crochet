import _ from 'underscore';
import { reducer } from 'utils';
import {
  CROCHET_NEW
} from 'constants/actionTypes';

const initialState = {
  crochet: [],
  patterns: []
};

export default reducer(
  initialState,
  {
    [CROCHET_NEW]: (state, action) => {
      const { width, height } = action;
      const crochet = new Array(height).map(
        () => new Array(width).map(
          () => ({
            pattern: undefined
          })
        )
      );

      return {
        ...initialState,
        crochet
      };
    }
  }
);
