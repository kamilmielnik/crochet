import React from 'react';
import { Circle, Group, Line, Rect } from 'react-konva';

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
    draw: () => null
  },

  [TOOL_SQUARE_EMPTY]: {
    toolId: TOOL_SQUARE_EMPTY,
    imageUrl: 'images/tools/tool_square_empty.svg',
    width: 1,
    height: 1,
    order: 1,
    group: TOOL_GROUP_2,
    draw: (x, y, height, width, color) => drawBorder(x, y, height, width, color)(null)
  },

  [TOOL_SQUARE_CROSS]: {
    toolId: TOOL_SQUARE_CROSS,
    imageUrl: 'images/tools/tool_square_cross.svg',
    width: 1,
    height: 1,
    order: 2,
    group: TOOL_GROUP_2,
    draw: (x, y, height, width, color) => drawBorder(x, y, height, width, color)(
      <Group>
        <Line
          lineCap="square"
          points={[
            x + 1, y + 1,
            x + width, y + height
          ]}
          strokeWidth={1}
          stroke={color} />
        <Line
          lineCap="square"
          points={[
            x + width, y + 1,
            x + 1, y + height
          ]}
          strokeWidth={1}
          stroke={color} />
      </Group>
    )
  },

  [TOOL_SQUARE_DOT]: {
    toolId: TOOL_SQUARE_DOT,
    imageUrl: 'images/tools/tool_square_dot.svg',
    width: 1,
    height: 1,
    order: 3,
    group: TOOL_GROUP_2,
    draw: (x, y, height, width, color) => drawBorder(x, y, height, width, color)(
      <Circle
        fill={color}
        radius={Math.ceil(width / 6)}
        x={x + (width + 1) / 2}
        y={y + (height + 1) / 2} />
    )
  },

  [TOOL_SQUARE_SQUARE]: {
    toolId: TOOL_SQUARE_SQUARE,
    imageUrl: 'images/tools/tool_square_square.svg',
    width: 1,
    height: 1,
    order: 4,
    group: TOOL_GROUP_2,
    draw: (x, y, height, width, color) => drawBorder(x, y, height, width, color)(
      <Rect
        fill={color}
        height={Math.ceil((height + 1) / 3)}
        width={Math.ceil((width + 1) / 3)}
        x={x + (width + 1) / 3}
        y={y + (height + 1) / 3} />
    )
  },

  [TOOL_RECTANGLE_EMPTY]: {
    toolId: TOOL_RECTANGLE_EMPTY,
    imageUrl: 'images/tools/tool_rectangle_empty.svg',
    width: 2,
    height: 1,
    order: 1,
    group: TOOL_GROUP_3,
    draw: (x, y, height, width, color) => drawBorder(x, y, height, width, color)(null)
  },

  [TOOL_RECTANGLE_EMPTY_90]: {
    toolId: TOOL_RECTANGLE_EMPTY_90,
    imageUrl: 'images/tools/tool_rectangle_empty-vertical.svg',
    width: 1,
    height: 2,
    order: 2,
    group: TOOL_GROUP_3,
    draw: (x, y, height, width, color) => drawBorder(x, y, height, width, color)(null)
  },

  [TOOL_RECTANGLE_ENVELOPE]: {
    toolId: TOOL_RECTANGLE_ENVELOPE,
    imageUrl: 'images/tools/tool_rectangle_envelope.svg',
    width: 2,
    height: 1,
    order: 1,
    mirrorVertical: TOOL_RECTANGLE_ENVELOPE_180,
    group: TOOL_GROUP_4,
    draw: (x, y, height, width, color) => drawBorder(x, y, height, width, color)(
      <Line
        lineCap="square"
        points={[
          x + 1, y + 1,
          x + (width + 1) / 2, y + height,
          x + width, y + 1
        ]}
        strokeWidth={1}
        stroke={color} />
    )
  },

  [TOOL_RECTANGLE_ENVELOPE_180]: {
    toolId: TOOL_RECTANGLE_ENVELOPE_180,
    imageUrl: 'images/tools/tool_rectangle_envelope_180.svg',
    width: 2,
    height: 1,
    order: 2,
    mirrorVertical: TOOL_RECTANGLE_ENVELOPE,
    group: TOOL_GROUP_4,
    draw: (x, y, height, width, color) => drawBorder(x, y, height, width, color)(
      <Line
        lineCap="square"
        points={[
          x + 1, y + height,
          x + (width + 1) / 2, y + 1,
          x + width, y + height
        ]}
        strokeWidth={1}
        stroke={color} />
    )
  },

  [TOOL_RECTANGLE_ENVELOPE_270]: {
    toolId: TOOL_RECTANGLE_ENVELOPE_270,
    imageUrl: 'images/tools/tool_rectangle_envelope_270.svg',
    width: 1,
    height: 2,
    order: 3,
    mirrorHorizontal: TOOL_RECTANGLE_ENVELOPE_90,
    group: TOOL_GROUP_4,
    draw: (x, y, height, width, color) => drawBorder(x, y, height, width, color)(
      <Line
        lineCap="square"
        points={[
          x + width, y + 1,
          x + 1, y + height / 2,
          x + width, y + height
        ]}
        strokeWidth={1}
        stroke={color} />
    )
  },

  [TOOL_RECTANGLE_ENVELOPE_90]: {
    toolId: TOOL_RECTANGLE_ENVELOPE_90,
    imageUrl: 'images/tools/tool_rectangle_envelope_90.svg',
    width: 1,
    height: 2,
    order: 4,
    mirrorHorizontal: TOOL_RECTANGLE_ENVELOPE_270,
    group: TOOL_GROUP_4,
    draw: (x, y, height, width, color) => drawBorder(x, y, height, width, color)(
      <Line
        lineCap="square"
        points={[
          x + 1, y + 1,
          x + width, y + height / 2,
          x + 1, y + height
        ]}
        strokeWidth={1}
        stroke={color} />
    )
  }
};

function drawBorder(x, y, height, width, color) {
  return children => (
    <Group>
      <Rect
        fill="white"
        height={height - 1}
        width={width - 1}
        x={x + 1}
        y={y + 1} />
      <Rect
        fill={color}
        height={1}
        width={width}
        x={x}
        y={y} />
      <Rect
        fill={color}
        height={1}
        width={width}
        x={x}
        y={y + height} />
      <Rect
        fill={color}
        height={height}
        width={1}
        x={x}
        y={y} />
      <Rect
        fill={color}
        height={height + 1}
        width={1}
        x={x + width}
        y={y} />
      {children}
    </Group>
  );
}
