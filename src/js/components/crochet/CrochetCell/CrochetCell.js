import React, { PropTypes } from 'react';
import _ from 'underscore';
import classNames from 'classnames';
import { TOOLS } from 'constants';
import { PureRender } from 'components/base';

const MOUSE_BUTTON_LEFT = 1;

export default class CrochetCell extends PureRender {
  static propTypes = {
    cellSize: PropTypes.number.isRequired,
    columnIndex: PropTypes.number.isRequired,
    rowIndex: PropTypes.number.isRequired,
    toolId: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.onActivated = _.throttle(() => {
      const { columnIndex, rowIndex, onClick } = this.props;
      onClick(rowIndex, columnIndex);
    }, 1000);
  }

  onMouseEnter = event => {
    const { buttons } = event;
    if (buttons === MOUSE_BUTTON_LEFT) {
      this.onActivated();
    }
  }

  render() {
    const { cellSize, toolId } = this.props;
    const { height, imageUrl, width } = TOOLS[toolId];
    const sizeClass = `size-${cellSize}`;

    return (
      <div
        className={classNames(
          'cell',
          sizeClass
        )}
        onMouseDown={this.onActivated}
        onMouseEnter={this.onMouseEnter}>
        {imageUrl && (
          <div
            className={classNames(
              'pattern',
              `height-${height}`,
              `width-${width}`,
              sizeClass
            )}
            style={{
              backgroundImage: `url(${imageUrl})`
            }} />
        )}
      </div>
    );
  }
}
