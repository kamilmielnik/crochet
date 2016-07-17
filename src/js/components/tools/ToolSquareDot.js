import React from 'react';
import { Circle } from 'react-konva';
import ToolOnlyBorders from './ToolOnlyBorders';

export default function ToolSquareDot(props) {
  const { height, width, x, y, color } = props;

  return ToolOnlyBorders(props)(
    <Circle
      fill={color}
      radius={Math.ceil(width / 6)}
      x={x + (width + 1) / 2}
      y={y + (height + 1) / 2} />
  );
}
