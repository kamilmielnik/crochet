import React, { Component, PropTypes } from 'react';
import _ from 'underscore';
import { KEY_Y, KEY_Z, TOOLS } from 'constants';
import { bindActionsAndConnect } from 'utils';
import { ToolsControls, UndoRedoControls } from 'components/crochet';
import './ToolBar.scss';

class ToolBar extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    canRedo: PropTypes.bool.isRequired,
    canUndo: PropTypes.bool.isRequired,
    tool: PropTypes.object.isRequired
  };

  componentWillMount = () => {
    document.addEventListener('keydown', this.onKeyDown);
  };

  componentWillUnmount = () => {
    document.removeEventListener('keydown', this.onKeyDown);
  };

  onKeyDown = event => {
    const { actions: { toolChoose }, canRedo, canUndo } = this.props;
    const { keyCode, ctrlKey } = event;

    if (ctrlKey) {
      if (keyCode === KEY_Y && canRedo) {
        this.onRedo();
      }

      if (keyCode === KEY_Z && canUndo) {
        this.onUndo();
      }
    } else {
      const { toolId } = _(TOOLS).find(({ keyCode: toolKeyCode }) => keyCode === toolKeyCode) || {};
      if (toolId !== undefined) {
        toolChoose(toolId);
      }
    }
  };

  onRedo = () => {
    const { actions: { undoableRedo } } = this.props;
    undoableRedo();
  };

  onUndo = () => {
    const { actions: { undoableUndo } } = this.props;
    undoableUndo();
  };

  render() {
    const {
      actions: { toolChoose },
      canRedo,
      canUndo,
      tool: { toolId }
    } = this.props;

    return (
      <div className="tool-bar">
        <UndoRedoControls
          canRedo={canRedo}
          canUndo={canUndo}
          onUndoClick={this.onUndo}
          onRedoClick={this.onRedo} />

        <ToolsControls
          toolId={toolId}
          onToolClick={toolChoose} />
      </div>
    );
  }
}

export default bindActionsAndConnect(ToolBar, state => ({
  tool: state.tool
}));
