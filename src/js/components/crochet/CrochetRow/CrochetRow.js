import React, { PropTypes } from 'react';
import { Group } from 'react-canvas';
import { PureRender } from 'components/base';
import CrochetCell from '../CrochetCell/CrochetCell';

export default class CrochetRow extends PureRender {
  static propTypes = {
    cellSize: PropTypes.number.isRequired,
    row: PropTypes.array.isRequired,
    rowIndex: PropTypes.number.isRequired,
    style: PropTypes.object
  };

  render() {
    const {
      cellSize,
      row,
      rowIndex,
      style,
      onCellClick
    } = this.props;

    return (
      <Group style={style}>
        {row.map((toolId, columnIndex) => (
          <CrochetCell
            key={columnIndex}
            cellSize={cellSize}
            columnIndex={columnIndex}
            rowIndex={rowIndex}
            toolId={toolId} />
        ))}
      </Group>
    );
  }
}
