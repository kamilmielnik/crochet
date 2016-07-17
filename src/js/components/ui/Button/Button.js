import React, { Component, PropTypes } from 'react';
import _ from 'underscore';
import classNames from 'classnames';
import './Button.scss';

export default class Button extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    isDisabled: PropTypes.bool,
    type: PropTypes.oneOf(['primary', 'secondary', 'danger']),
    onClick: PropTypes.func
  };

  static defaultProps = {
    isDisabled: false,
    type: 'primary',
    onClick: _.noop
  };

  onClick = () => {
    const { onClick } = this.props;
    onClick();
  }

  render() {
    const {
      children,
      className,
      isDisabled,
      type
    } = this.props;

    return (
      <div
        onClick={this.onClick}
        className={classNames(
          'button',
          'ellipsis',
          type,
          {
            'is-disabled': isDisabled
          },
          className
        )}>
        {children}
      </div>
    );
  }
}
