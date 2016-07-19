import React, { PropTypes } from 'react';
import classNames from 'classnames';
import onClickOutside from 'react-onclickoutside';
import { PureRender } from 'components/base';
import Button from '../Button/Button';
import './Dropdown.scss';

class Dropdown extends PureRender {
  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    isShown: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    onHide: PropTypes.func.isRequired,
    onShow: PropTypes.func.isRequired
  };

  handleClickOutside = () => {
    const { onHide } = this.props;
    onHide();
  };

  onDropdownItemsClick = () => {
    this.handleClickOutside();
  };

  onShowClick = () => {
    const { isShown, onHide, onShow } = this.props;
    if (isShown) {
      onHide();
    } else {
      onShow();
    }
  };

  render() {
    const {
      children,
      className,
      isShown,
      label
    } = this.props;

    return (
      <div
        className={classNames(
          'dropdown',
          {
            'is-shown': isShown
          },
          className
        )}>
        <div className="trigger">
          <Button onClick={this.onShowClick}>
            {label}
          </Button>
        </div>

        <div className="dropdown-items" onClick={this.onDropdownItemsClick}>
          {children}
        </div>
      </div>
    );
  }
}

export default onClickOutside(Dropdown);
