import React from 'react';
import { Group, Line } from 'react-konva';
import ToolOnlyBorders from './ToolOnlyBorders';

export default function ToolSquareCross(props) {
  const { height, width, x, y, color } = props;

  return ToolOnlyBorders(props)(
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
  );
}
