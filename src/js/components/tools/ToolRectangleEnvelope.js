import React from 'react';
import { Line } from 'react-konva';
import ToolOnlyBorders from './ToolOnlyBorders';

export default function ToolRectangleEnvelope(props) {
  const { height, width, x, y, color } = props;

  return ToolOnlyBorders(props)(
    <Line
      lineCap="square"
      points={[
        x + 1, y + 1,
        x + (width + 1) / 2, y + height,
        x + width, y + 1
      ]}
      strokeWidth={1}
      stroke={color} />
  );
}
