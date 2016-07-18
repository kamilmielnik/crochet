import {
  KEY_1,
  KEY_Q, KEY_W, KEY_E, KEY_R,
  KEY_A, KEY_S,
  KEY_Z, KEY_X, KEY_C, KEY_V
} from 'constants';
import {
  ToolNone,
  ToolOnlyBorders,
  ToolRectangleEnvelope,
  ToolRectangleEnvelope90,
  ToolRectangleEnvelope180,
  ToolRectangleEnvelope270,
  ToolSquareCross,
  ToolSquareDot,
  ToolSquareSquare
} from 'components/tools';

export const TOOL_NONE = 0;
export const TOOL_SQUARE_SQUARE = 1;
export const TOOL_RECTANGLE_EMPTY = 2;
export const TOOL_RECTANGLE_EMPTY_90 = 3;
export const TOOL_RECTANGLE_ENVELOPE = 4;
export const TOOL_RECTANGLE_ENVELOPE_90 = 5;
export const TOOL_RECTANGLE_ENVELOPE_180 = 6;
export const TOOL_RECTANGLE_ENVELOPE_270 = 7;
export const TOOL_SQUARE_CROSS = 8;
export const TOOL_SQUARE_DOT = 9;
export const TOOL_SQUARE_EMPTY = 10;

export const TOOL_GROUP_1 = 1;
export const TOOL_GROUP_2 = 2;
export const TOOL_GROUP_3 = 3;
export const TOOL_GROUP_4 = 4;

export const TOOLS = {
  [TOOL_NONE]: {
    name: 'Gumka',
    toolId: TOOL_NONE,
    imageUrl: undefined,
    iconUrl: 'images/tools/tool_eraser.png',
    width: 1,
    height: 1,
    order: 1,
    group: TOOL_GROUP_1,
    keyCode: KEY_1,
    Component: ToolNone
  },

  [TOOL_SQUARE_EMPTY]: {
    toolId: TOOL_SQUARE_EMPTY,
    imageUrl: 'images/tools/tool_square_empty.svg',
    width: 1,
    height: 1,
    order: 1,
    group: TOOL_GROUP_2,
    keyCode: KEY_Q,
    Component: props => ToolOnlyBorders(props)(ToolNone())
  },

  [TOOL_SQUARE_CROSS]: {
    toolId: TOOL_SQUARE_CROSS,
    imageUrl: 'images/tools/tool_square_cross.svg',
    width: 1,
    height: 1,
    order: 2,
    group: TOOL_GROUP_2,
    keyCode: KEY_W,
    Component: ToolSquareCross
  },

  [TOOL_SQUARE_DOT]: {
    toolId: TOOL_SQUARE_DOT,
    imageUrl: 'images/tools/tool_square_dot.svg',
    width: 1,
    height: 1,
    order: 3,
    group: TOOL_GROUP_2,
    keyCode: KEY_E,
    Component: ToolSquareDot
  },

  [TOOL_SQUARE_SQUARE]: {
    toolId: TOOL_SQUARE_SQUARE,
    imageUrl: 'images/tools/tool_square_square.svg',
    width: 1,
    height: 1,
    order: 4,
    group: TOOL_GROUP_2,
    keyCode: KEY_R,
    Component: ToolSquareSquare
  },

  [TOOL_RECTANGLE_EMPTY]: {
    toolId: TOOL_RECTANGLE_EMPTY,
    imageUrl: 'images/tools/tool_rectangle_empty.svg',
    width: 2,
    height: 1,
    order: 1,
    group: TOOL_GROUP_3,
    keyCode: KEY_A,
    Component: props => ToolOnlyBorders(props)(ToolNone())
  },

  [TOOL_RECTANGLE_EMPTY_90]: {
    toolId: TOOL_RECTANGLE_EMPTY_90,
    imageUrl: 'images/tools/tool_rectangle_empty-vertical.svg',
    width: 1,
    height: 2,
    order: 2,
    group: TOOL_GROUP_3,
    keyCode: KEY_S,
    Component: props => ToolOnlyBorders(props)(ToolNone())
  },

  [TOOL_RECTANGLE_ENVELOPE]: {
    toolId: TOOL_RECTANGLE_ENVELOPE,
    imageUrl: 'images/tools/tool_rectangle_envelope.svg',
    width: 2,
    height: 1,
    order: 1,
    mirrorVertical: TOOL_RECTANGLE_ENVELOPE_180,
    group: TOOL_GROUP_4,
    keyCode: KEY_Z,
    Component: ToolRectangleEnvelope
  },

  [TOOL_RECTANGLE_ENVELOPE_180]: {
    toolId: TOOL_RECTANGLE_ENVELOPE_180,
    imageUrl: 'images/tools/tool_rectangle_envelope_180.svg',
    width: 2,
    height: 1,
    order: 2,
    mirrorVertical: TOOL_RECTANGLE_ENVELOPE,
    group: TOOL_GROUP_4,
    keyCode: KEY_X,
    Component: ToolRectangleEnvelope180
  },

  [TOOL_RECTANGLE_ENVELOPE_270]: {
    toolId: TOOL_RECTANGLE_ENVELOPE_270,
    imageUrl: 'images/tools/tool_rectangle_envelope_270.svg',
    width: 1,
    height: 2,
    order: 3,
    mirrorHorizontal: TOOL_RECTANGLE_ENVELOPE_90,
    group: TOOL_GROUP_4,
    keyCode: KEY_C,
    Component: ToolRectangleEnvelope270
  },

  [TOOL_RECTANGLE_ENVELOPE_90]: {
    toolId: TOOL_RECTANGLE_ENVELOPE_90,
    imageUrl: 'images/tools/tool_rectangle_envelope_90.svg',
    width: 1,
    height: 2,
    order: 4,
    mirrorHorizontal: TOOL_RECTANGLE_ENVELOPE_270,
    group: TOOL_GROUP_4,
    keyCode: KEY_V,
    Component: ToolRectangleEnvelope90
  }
};
