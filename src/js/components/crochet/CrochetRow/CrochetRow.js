import React, { Component, PropTypes } from 'react';
import { PureRender } from 'components/base';
import CrochetCell from '../CrochetCell/CrochetCell';

export default class CrochetRow extends PureRender {
  static propTypes = {
    row: PropTypes.array.isRequired,
    rowIndex: PropTypes.number.isRequired,
    onCellClick: PropTypes.func.isRequired
  };

  render() {
    const { row, rowIndex, onCellClick } = this.props;

    return (
      <div className="row">
        {row.map((cell, columnIndex) => (
          <CrochetCell
            {...cell}
            key={columnIndex}
            columnIndex={columnIndex}
            rowIndex={rowIndex}
            onClick={onCellClick} />
        ))}
      </div>
    );
  }
}
