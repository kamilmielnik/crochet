export const TOOL_NONE = 'TOOL_NONE';
export const TOOL_RECTANGLE_EMPTY = 'TOOL_RECTANGLE_EMPTY';
export const TOOL_RECTANGLE_ENVELOPE = 'TOOL_RECTANGLE_ENVELOPE';
export const TOOL_SQUARE_CROSS = 'TOOL_SQUARE_CROSS';
export const TOOL_SQUARE_EMPTY = 'TOOL_SQUARE_EMPTY';

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
    group: TOOL_GROUP_1
  },

  [TOOL_SQUARE_EMPTY]: {
    toolId: TOOL_SQUARE_EMPTY,
    imageUrl: 'images/tools/tool_square_empty.svg',
    width: 1,
    height: 1,
    group: TOOL_GROUP_2
  },

  [TOOL_SQUARE_CROSS]: {
    toolId: TOOL_SQUARE_CROSS,
    imageUrl: 'images/tools/tool_square_cross.svg',
    width: 1,
    height: 1,
    group: TOOL_GROUP_2
  },

  [TOOL_RECTANGLE_EMPTY]: {
    toolId: TOOL_RECTANGLE_EMPTY,
    imageUrl: 'images/tools/tool_rectangle_empty.svg',
    width: 2,
    height: 1,
    group: TOOL_GROUP_3
  },

  [TOOL_RECTANGLE_ENVELOPE]: {
    toolId: TOOL_RECTANGLE_ENVELOPE,
    imageUrl: 'images/tools/tool_rectangle_envelope.svg',
    width: 2,
    height: 1,
    group: TOOL_GROUP_4
  }
};
