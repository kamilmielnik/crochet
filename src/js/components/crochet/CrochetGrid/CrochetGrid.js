import React, { PropTypes } from 'react';
import _ from 'underscore';
import { Layer, Rect } from 'react-konva';
import { PureRender } from 'components/base';

export default class CrochetGrid extends PureRender {
  static propTypes = {
    cellSize: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    numberOfColumns: PropTypes.number.isRequired,
    numberOfRows: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired
  };

  generateHorizontalLines = () => {
    const { cellSize, width, numberOfRows } = this.props;

    return _.range(0, numberOfRows + 1).map(index => {
      const y = index * cellSize;
      return { width, height: 1, y };
    });
  };

  generateVerticalLines = () => {
    const { cellSize, height, numberOfColumns } = this.props;

    return _.range(0, numberOfColumns + 1).map(index => {
      const x = index * cellSize;
      return { width: 1, height, x };
    });
  };

  render() {
    return (
      <Layer>
        {this.generateHorizontalLines().map(({ width, height, y }, lineIndex) => (
          <Rect
            fill="black"
            key={lineIndex}
            height={height}
            width={width}
            y={y} />
        ))}

        {this.generateVerticalLines().map(({ width, height, x }, lineIndex) => (
          <Rect
            fill="black"
            key={lineIndex}
            height={height}
            width={width}
            x={x} />
        ))}
      </Layer>
    );
  }
}
