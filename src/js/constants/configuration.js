import _ from 'underscore';

export const CROCHET_DEFAULT_NUMBER_OF_COLUMNS = 30;
export const CROCHET_DEFAULT_NUMBER_OF_ROWS = 30;

export const UNDO_HISTORY_LIMIT = 30;
export const PERSISTENCE_TIMEOUT = 5000;

export const CROCHET_SIZE_MIN = 8;
export const CROCHET_SIZE_DEFAULT = 16;
export const CROCHET_SIZE_MAX = 30;
export const CROTCHET_SIZE_OPTIONS = _.range(CROCHET_SIZE_MIN, CROCHET_SIZE_MAX + 1);

export const CHUNK_SIZE = 5;
export const CELL_INTERACTION_DEBOUNCE = 50;

export const CROCHET_GRID_COLOR = 'lightgray';
export const CROCHET_GRID_BACKGROUND = 'white';
export const CROCHET_GRID_BACKGROUND_HIGHLIGHT = '#3E606F';
export const CROCHET_PATTERN_COLOR = 'black';
