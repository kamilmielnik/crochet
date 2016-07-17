import React, { PropTypes } from 'react';
import { TOOLS } from 'constants';
import { Image } from 'react-konva';
import { PureRender } from 'components/base';

export default class CrochetCell extends PureRender {
  static propTypes = {
    cellSize: PropTypes.number.isRequired,
    columnIndex: PropTypes.number.isRequired,
    rowIndex: PropTypes.number.isRequired,
    toolId: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
    this.updateImage(props);
  }

  componentWillUpdate = newProps => {
    this.updateImage(newProps);
  };

  componentWillUnmount = () => {
    this.image = undefined;
  };

  updateImage = props => {
    const { toolId } = props;
    const { imageUrl = '' } = TOOLS[toolId];
    this.image = new window.Image();
    this.image.src = imageUrl;
  };

  render() {
    const { cellSize, columnIndex, rowIndex, toolId } = this.props;
    const { height, width } = TOOLS[toolId];

    return (
      <Image
        image={this.image}
        x={columnIndex * cellSize}
        y={rowIndex * cellSize}
        width={cellSize * width}
        height={cellSize * height} />
    );
  }
}
