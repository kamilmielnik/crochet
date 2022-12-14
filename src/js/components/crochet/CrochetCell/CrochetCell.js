import React, { PropTypes } from 'react';
import { CROCHET_PATTERN_COLOR, TOOLS } from 'constants';
import { Group } from 'react-konva';
import { PureRender } from 'components/base';

export default class CrochetCell extends PureRender {
  static propTypes = {
    cellSize: PropTypes.number.isRequired,
    color: PropTypes.string,
    columnIndex: PropTypes.number.isRequired,
    rowIndex: PropTypes.number.isRequired,
    toolId: PropTypes.number.isRequired
  };

  static defaultProps = {
    color: CROCHET_PATTERN_COLOR
  };

  render() {
    const { cellSize, color, columnIndex, rowIndex, toolId } = this.props;
    const { Component, height, width } = TOOLS[toolId];

    return (
      <Group>
        {Component({
          height: cellSize * height,
          width: cellSize * width,
          color,
          x: columnIndex * cellSize,
          y: rowIndex * cellSize
        })}
      </Group>
    );
  }
}
