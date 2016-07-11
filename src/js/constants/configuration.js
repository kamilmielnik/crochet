import _ from 'underscore';

export const CROCHET_DEFAULT_COLUMNS = 30;
export const CROCHET_DEFAULT_ROWS = 30;

export const UNDO_HISTORY_LIMIT = 30;
export const PERSISTENCE_DEBOUNCE = 500;

export const CROCHET_SIZE_MIN = 8;
export const CROCHET_SIZE_DEFAULT = 16;
export const CROCHET_SIZE_MAX = 30;
export const CROTCHET_SIZE_OPTIONS = _.range(CROCHET_SIZE_MIN, CROCHET_SIZE_MAX + 1);
