import { CROCHET_DEFAULT_WIDTH, CROCHET_DEFAULT_HEIGHT } from 'constants';
import { CROCHET_NEW } from 'constants/actionTypes';

export { push as redirect } from 'react-router-redux';

export function crochetNew(width = CROCHET_DEFAULT_WIDTH, height = CROCHET_DEFAULT_HEIGHT) {
  return {
    type: CROCHET_NEW,
    width,
    height
  };
}
