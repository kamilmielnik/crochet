import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { PureRender } from 'components/base';
import './InputLabel.scss';

export default class InputLabel extends PureRender {
  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string
  };

  render() {
    const { children, className } = this.props;

    return (
      <div
        className={classNames(
          'input-label',
          className
        )}>
        {children}
      </div>
    );
  }
}
