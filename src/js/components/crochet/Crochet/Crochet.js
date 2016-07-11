import React, { PropTypes } from 'react';
import { PureRender } from 'components/base';
import { CrochetRow } from 'components/crochet';
import './Crochet.scss';

export default class Crochet extends PureRender {
  static propTypes = {
    canvas: PropTypes.array.isRequired,
    cellSize: PropTypes.number.isRequired,
    onCellClick: PropTypes.func.isRequired
  };

  render() {
    const {
      canvas,
      cellSize,
      onCellClick,
      ...restProps
    } = this.props;

    return (
      <div className="crochet" {...restProps}>
        {canvas.map((row, rowIndex) => (
          <CrochetRow
            key={rowIndex}
            className="row"
            cellSize={cellSize}
            row={row}
            rowIndex={rowIndex}
            onCellClick={onCellClick} />
        ))}
      </div>
    );
  }
}
