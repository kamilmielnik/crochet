import React, { PropTypes } from 'react';
import { PureRender } from 'components/base';
import CrochetCell from '../CrochetCell/CrochetCell';

export default class CrochetRow extends PureRender {
  static propTypes = {
    cellSize: PropTypes.number.isRequired,
    row: PropTypes.array.isRequired,
    rowIndex: PropTypes.number.isRequired,
    onCellClick: PropTypes.func.isRequired
  };

  render() {
    const {
      cellSize,
      row,
      rowIndex,
      onCellClick
    } = this.props;

    return (
      <div className="row">
        {row.map((cell, columnIndex) => (
          <CrochetCell
            key={columnIndex}
            columnIndex={columnIndex}
            cellSize={cellSize}
            rowIndex={rowIndex}
            toolId={cell}
            onClick={onCellClick} />
        ))}
      </div>
    );
  }
}
