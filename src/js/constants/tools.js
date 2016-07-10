export const TOOL_NONE = 'TOOL_NONE';
export const TOOL_RECTANGLE_EMPTY = 'TOOL_RECTANGLE_EMPTY';
export const TOOL_RECTANGLE_ENVELOPE = 'TOOL_RECTANGLE_ENVELOPE';
export const TOOL_SQUARE_CROSS = 'TOOL_SQUARE_CROSS';
export const TOOL_SQUARE_EMPTY = 'TOOL_SQUARE_EMPTY';

export const TOOLS = {
  [TOOL_NONE]: {
    name: 'Gumka',
    toolId: TOOL_NONE,
    imageUrl: undefined,
    width: 1,
    height: 1
  },

  [TOOL_RECTANGLE_EMPTY]: {
    name: 'Prostokąt',
    toolId: TOOL_RECTANGLE_EMPTY,
    imageUrl: 'images/tools/tool_rectangle_empty.png',
    width: 2,
    height: 1
  },

  [TOOL_RECTANGLE_ENVELOPE]: {
    name: 'Prostokąt koperta',
    toolId: TOOL_RECTANGLE_ENVELOPE,
    imageUrl: 'images/tools/tool_rectangle_envelope.png',
    width: 2,
    height: 1
  },

  [TOOL_SQUARE_CROSS]: {
    name: 'Kwadrat krzyż',
    toolId: TOOL_SQUARE_CROSS,
    imageUrl: 'images/tools/tool_square_cross.png',
    width: 1,
    height: 1
  },

  [TOOL_SQUARE_EMPTY]: {
    name: 'Kwadrat',
    toolId: TOOL_SQUARE_EMPTY,
    imageUrl: 'images/tools/tool_square_empty.png',
    width: 1,
    height: 1
  }
};
