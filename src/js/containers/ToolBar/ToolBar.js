import React, { Component, PropTypes } from 'react';
import { bindActionsAndConnect } from 'utils';
import { CanvasControls, ToolsControls, UndoRedoControls } from 'components/crochet';
import './ToolBar.scss';

class ToolBar extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    areEmptyCellsHighlighted: PropTypes.bool.isRequired,
    canRedo: PropTypes.bool.isRequired,
    canUndo: PropTypes.bool.isRequired,
    tool: PropTypes.object.isRequired
  };

  onAdd10Rows = () => {
    const { actions: { crochetAddRows } } = this.props;
    crochetAddRows(10);
  };

  onAddRow = () => {
    const { actions: { crochetAddRows } } = this.props;
    crochetAddRows(1);
  };

  onAdd10Columns = () => {
    const { actions: { crochetAddColumns } } = this.props;
    crochetAddColumns(10);
  };

  onAddColumn = () => {
    const { actions: { crochetAddColumns } } = this.props;
    crochetAddColumns(1);
  };

  onHighlightEmpty = () => {
    const { actions: { crochetHighlightEmpty }, areEmptyCellsHighlighted } = this.props;
    crochetHighlightEmpty(!areEmptyCellsHighlighted);
  };

  onMirrorHorizontal = () => {
    const { actions: { crochetMirrorHorizontal } } = this.props;
    crochetMirrorHorizontal();
  };

  onMirrorVertical = () => {
    const { actions: { crochetMirrorVertical } } = this.props;
    crochetMirrorVertical();
  };

  onRedo = () => {
    const { actions: { redo } } = this.props;
    redo();
  };

  onUndo = () => {
    const { actions: { undo } } = this.props;
    undo();
  };

  render() {
    const {
      actions: { toolChoose },
      areEmptyCellsHighlighted,
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

        <CanvasControls
          areEmptyCellsHighlighted={areEmptyCellsHighlighted}
          onAdd10Columns={this.onAdd10Columns}
          onAdd10Rows={this.onAdd10Rows}
          onAddColumn={this.onAddColumn}
          onAddRow={this.onAddRow}
          onHighlightEmpty={this.onHighlightEmpty}
          onMirrorHorizontal={this.onMirrorHorizontal}
          onMirrorVertical={this.onMirrorVertical} />
      </div>
    );
  }
}

export default bindActionsAndConnect(ToolBar, state => ({
  tool: state.tool
}));
