import React, { Component, PropTypes } from 'react';
import { bindActionsAndConnect } from 'utils';

class EditCrochet extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    crochet: PropTypes.object.isRequired
  };

  render() {
    const {
      actions,
      crochet
    } = this.props;

    return (
      <div>
        EditCrochet
      </div>
    );
  }
}

export default bindActionsAndConnect(EditCrochet, state => ({
  crochet: state.crochet
}));
