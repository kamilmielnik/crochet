import React, { PropTypes } from 'react';
import _ from 'underscore';
import { CELL_INTERACTION_DEBOUNCE, CHUNK_SIZE } from 'constants';
import { debounceSameArgs, getCursorPosition } from 'utils';
import { Layer, Rect, Stage } from 'react-konva';
import { PureRender } from 'components/base';
import { CrochetGrid, CrochetRow } from 'components/crochet';

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
  }, CELL_INTERACTION_DEBOUNCE);

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

  render() {
    const { canvas, cellSize } = this.props;
    const numberOfRows = canvas.length;
    const numberOfColumns = numberOfRows === 0 ? 0 : canvas[0].length;
    const width = cellSize * numberOfColumns + 1;
    const height = cellSize * numberOfRows + 1;

    const numberOfChunks = Math.ceil(numberOfRows / CHUNK_SIZE);
    const canvasChunks = _.range(numberOfChunks + 1).reduce((chunks, chunkNumber) => {
      const firstIndex = chunkNumber * CHUNK_SIZE;
      const chunk = canvas.slice(firstIndex, firstIndex + CHUNK_SIZE);
      chunks.push(chunk);
      return chunks;
    }, []);

    return (
      <Stage
        className="crochet"
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

        <CrochetGrid
          cellSize={cellSize}
          height={height}
          numberOfColumns={numberOfColumns}
          numberOfRows={numberOfRows}
          width={width} />

        {canvasChunks.map((chunk, chunkIndex) => {
          const chunkIndexOffset = chunkIndex * CHUNK_SIZE;
          return (
            <Layer key={chunkIndex}>
              {chunk.map((row, rowIndex) => (
                <CrochetRow
                  key={rowIndex}
                  cellSize={cellSize}
                  row={row}
                  rowIndex={chunkIndexOffset + rowIndex}
                  width={width} />
              ))}
            </Layer>
          );
        })}
      </Stage>
    );
  }
}
