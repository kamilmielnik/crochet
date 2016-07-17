import React from 'react';
import { Line } from 'react-konva';
import ToolOnlyBorders from './ToolOnlyBorders';

export default function ToolRectangleEnvelope270(props) {
  const { height, width, x, y, color } = props;

  return ToolOnlyBorders(props)(
    <Line
      lineCap="square"
      points={[
        x + width, y + 1,
        x + 1, y + height / 2,
        x + width, y + height
      ]}
      strokeWidth={1}
      stroke={color} />
  );
}
