import React from 'react';
import { Line } from 'react-konva';
import ToolOnlyBorders from './ToolOnlyBorders';

export default function ToolRectangleEnvelope90(props) {
  const { height, width, x, y, color } = props;

  return ToolOnlyBorders(props)(
    <Line
      lineCap="square"
      points={[
        x + 1, y + 1,
        x + width, y + height / 2,
        x + 1, y + height
      ]}
      strokeWidth={1}
      stroke={color} />
  );
}
