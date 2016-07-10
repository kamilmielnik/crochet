import React, { Component, PropTypes } from 'react';
import _ from 'underscore';
import classNames from 'classnames';
import { PureRender } from 'components/base';

const MOUSE_BUTTON_LEFT = 1;

export default class CrochetCell extends PureRender {
  static propTypes = {
    columnIndex: PropTypes.number.isRequired,
    height: PropTypes.number,
    imageUrl: PropTypes.string,
    pattern: PropTypes.string,
    rowIndex: PropTypes.number.isRequired,
    width: PropTypes.number,
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
    const {
      columnIndex,
      height,
      imageUrl,
      rowIndex,
      width
    } = this.props;

    return (
      <div
        className="cell"
        onMouseDown={this.onActivated}
        onMouseEnter={this.onMouseEnter}>
        {imageUrl && (
          <div
            className={classNames(
              'pattern',
              `height-${height}`,
              `width-${width}`
            )}
            style={{
              backgroundImage: `url(${imageUrl})`
            }} />
        )}
      </div>
    );
  }
}
