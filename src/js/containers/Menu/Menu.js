import React, { Component, PropTypes } from 'react';
import { bindActionsAndConnect } from 'utils';
import './Menu.scss';

class Menu extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
    controls: PropTypes.node,
    title: PropTypes.string.isRequired
  };

  onLogoClick = () => {
    const { actions: { redirect } } = this.props;
    redirect('/o-programie');
  };

  render() {
    const { children, controls, title } = this.props;

    return (
      <div className="menu-container">
        <div className="menu">
          <div className="logo" onClick={this.onLogoClick}>
            Szydełko
          </div>

          <div className="title">
            {title}
          </div>

          <div className="controls">
            {controls}
          </div>
        </div>

        <div className="content">
          {children}
        </div>
      </div>
    );
  }
}

export default bindActionsAndConnect(Menu, () => ({}));
