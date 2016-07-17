import React, { PropTypes } from 'react';
import { debounceSameArgs, getCursorPosition } from 'utils';
import { Layer, Rect, Stage } from 'react-konva';
import { PureRender } from 'components/base';
import { CrochetRow } from 'components/crochet';
import './Crochet.scss';

const MOUSE_BUTTON_LEFT = 1;

export default class Crochet extends PureRender {
  static propTypes = {
    canvas: PropTypes.array.isRequired,
    cellSize: PropTypes.number.isRequired,
    onCellClick: PropTypes.func.isRequired
  };

  onCellClickDebounced = debounceSameArgs((rowIndex, columnIndex) => {
    const { onCellClick } = this.props;
    onCellClick(rowIndex, columnIndex);
  }, 100);

  onClick = event => {
    const { rowIndex, columnIndex } = this.getCellPosition(event);
    this.onCellClickDebounced(rowIndex, columnIndex);
  };

  onMouseMove = event => {
    if (event.evt.buttons === MOUSE_BUTTON_LEFT) {
      this.onClick(event);
    }
  };

  getCellPosition = event => {
    const { cellSize } = this.props;
    const { x, y } = getCursorPosition(event);
    const rowIndex = Math.floor(y / cellSize);
    const columnIndex = Math.floor(x / cellSize);
    return { rowIndex, columnIndex };
  };

  getCellStyle = (rowIndex, columnIndex) => {
    const { cellSize } = this.props;

    return {
      top: rowIndex * cellSize,
      left: columnIndex * cellSize,
      width: cellSize,
      height: cellSize
    };
  };

  render() {
    const {
      canvas,
      cellSize
    } = this.props;

    const numberOfRows = canvas.length;
    const numberOfColumns = numberOfRows === 0 ? 0 : canvas[0].length;
    const width = cellSize * numberOfColumns;
    const height = cellSize * numberOfRows;

    return (
      <Stage
        width={width}
        height={height}
        onClick={this.onClick}
        onMouseMove={this.onMouseMove}>
        <Layer>
          <Rect
            fill="white"
            x={0}
            y={0}
            width={width}
            height={height} />
        </Layer>

        {canvas.map((row, rowIndex) => (
          <CrochetRow
            key={rowIndex}
            cellSize={cellSize}
            row={row}
            rowIndex={rowIndex}
            width={width} />
        ))}
      </Stage>
    );
  }
}
