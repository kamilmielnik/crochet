import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { PureRender } from 'components/base';
import './Form.scss';

export default class Form extends PureRender {
  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string
  };

  render() {
    const { children, className } = this.props;

    return (
      <div
        className={classNames(
          'form',
          className
        )}>
        {children}
      </div>
    );
  }
}
