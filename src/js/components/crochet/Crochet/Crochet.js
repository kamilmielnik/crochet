import React, { PropTypes } from 'react';
import { PureRender } from 'components/base';
import { CrochetRow } from 'components/crochet';
import './Crochet.scss';

export default class Crochet extends PureRender {
  static propTypes = {
    canvas: PropTypes.array.isRequired,
    onCellClick: PropTypes.func.isRequired
  };

  render() {
    const { canvas, onCellClick } = this.props;

    return (
      <div className="crochet">
        {canvas.map((row, rowIndex) => (
          <CrochetRow
            key={rowIndex}
            className="row"
            row={row}
            rowIndex={rowIndex}
            onCellClick={onCellClick} />
        ))}
      </div>
    );
  }
}
