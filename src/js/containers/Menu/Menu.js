import React, { Component, PropTypes } from 'react';
import { bindActionsAndConnect } from 'utils';

class Menu extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired
  };

  render() {
    const {
      actions
    } = this.props;

    return (
      <div>
        Menu
      </div>
    );
  }
}

export default bindActionsAndConnect(Menu, state => ({

}));
