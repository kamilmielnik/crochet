import React, { PropTypes } from 'react';
import _ from 'underscore';
import { CROCHET_GRID_COLOR } from 'constants';
import { Layer, Rect } from 'react-konva';
import { PureRender } from 'components/base';

export default class CrochetGrid extends PureRender {
  static propTypes = {
    cellSize: PropTypes.number.isRequired,
    color: PropTypes.string,
    height: PropTypes.number.isRequired,
    numberOfColumns: PropTypes.number.isRequired,
    numberOfRows: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired
  };

  static defaultProps = {
    color: CROCHET_GRID_COLOR
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
    const { color } = this.props;

    return (
      <Layer>
        {this.generateHorizontalLines().map(({ width, height, y }, lineIndex) => (
          <Rect
            fill={color}
            key={lineIndex}
            height={height}
            width={width}
            y={y} />
        ))}

        {this.generateVerticalLines().map(({ width, height, x }, lineIndex) => (
          <Rect
            fill={color}
            key={lineIndex}
            height={height}
            width={width}
            x={x} />
        ))}
      </Layer>
    );
  }
}
