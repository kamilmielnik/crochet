import React, { PropTypes } from 'react';
import _ from 'underscore';
import classNames from 'classnames';
import { TOOLS } from 'constants';
import { Image } from 'react-canvas';
import { PureRender } from 'components/base';

const MOUSE_BUTTON_LEFT = 1;

export default class CrochetCell extends PureRender {
  static propTypes = {
    cellSize: PropTypes.number.isRequired,
    columnIndex: PropTypes.number.isRequired,
    rowIndex: PropTypes.number.isRequired,
    toolId: PropTypes.number.isRequired
  };

  render() {
    const { cellSize, columnIndex, rowIndex, toolId } = this.props;
    const { height, imageUrl, width } = TOOLS[toolId];
    const cellStyle = {
      top: rowIndex * cellSize,
      left: columnIndex * cellSize,
      width: cellSize * width,
      height: cellSize * height
    };

    if (!imageUrl) {
      return undefined;
    }

    return (
      <Image src={imageUrl} style={cellStyle} />
    );
  }
}
