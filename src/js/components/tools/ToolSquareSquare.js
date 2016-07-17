import React from 'react';
import { Rect } from 'react-konva';
import ToolOnlyBorders from './ToolOnlyBorders';

export default function ToolSquareSquare(props) {
  const { height, width, x, y, color } = props;

  return ToolOnlyBorders(props)(
    <Rect
      fill={color}
      height={Math.ceil((height + 1) / 3)}
      width={Math.ceil((width + 1) / 3)}
      x={x + (width + 1) / 3}
      y={y + (height + 1) / 3} />
  );
}
