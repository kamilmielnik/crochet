import React from 'react';
import { Group, Rect } from 'react-konva';

export default function ToolOnlyBorders(props) {
  const { height, width, x, y, color } = props;

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
