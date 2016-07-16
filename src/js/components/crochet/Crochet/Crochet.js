import React, { PropTypes } from 'react';
import { TOOLS } from 'constants';
import { debounceSameArgs, getCursorPosition } from 'utils';
import { Group, Image, Layer, Surface } from 'react-canvas';
import { PureRender } from 'components/base';
import { CrochetRow } from 'components/crochet';
import './Crochet.scss';

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
      cellSize,
      onCellClick,
      ...restProps
    } = this.props;

    const numberOfRows = canvas.length;
    const numberOfColumns = numberOfRows === 0 ? 0 : canvas[0].length;
    const width = cellSize * numberOfColumns;
    const height = cellSize * numberOfRows;

    const rowStyle = { width, height: cellSize };

    return (
      <Surface
        className="crochet"
        width={width}
        height={height}
        left={0}
        top={0}>
        <Group
          style={{
            height,
            width
          }}
          onClick={this.onClick}
          onTouchMove={this.onClick}>
          {canvas.map((row, rowIndex) => (
            <CrochetRow
              key={rowIndex}
              cellSize={cellSize}
              row={row}
              rowIndex={rowIndex}
              style={rowStyle} />
          ))}
        </Group>
      </Surface>
    );
  }
}
