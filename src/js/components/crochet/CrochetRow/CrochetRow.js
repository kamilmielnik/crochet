import React, { PropTypes } from 'react';
import { Group, Layer } from 'react-konva';
import { PureRender } from 'components/base';
import CrochetCell from '../CrochetCell/CrochetCell';

export default class CrochetRow extends PureRender {
  static propTypes = {
    cellSize: PropTypes.number.isRequired,
    row: PropTypes.array.isRequired,
    rowIndex: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired
  };

  render() {
    const {
      cellSize,
      row,
      rowIndex,
      width
    } = this.props;

    return (
      <Layer>
        <Group width={width} height={cellSize}>
          {row.map((toolId, columnIndex) => (
            <CrochetCell
              key={columnIndex}
              cellSize={cellSize}
              columnIndex={columnIndex}
              rowIndex={rowIndex}
              toolId={toolId} />
          ))}
        </Group>
      </Layer>
    );
  }
}
