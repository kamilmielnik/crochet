import React from 'react';
import { Line } from 'react-konva';
import ToolOnlyBorders from './ToolOnlyBorders';

export default function ToolRectangleEnvelope180(props) {
  const { height, width, x, y, color } = props;

  return ToolOnlyBorders(props)(
    <Line
      lineCap="square"
      points={[
        x + 1, y + height,
        x + (width + 1) / 2, y + 1,
        x + width, y + height
      ]}
      strokeWidth={1}
      stroke={color} />
  );
}
