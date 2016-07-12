import React, { Component, PropTypes } from 'react';
import _ from 'underscore';
import classNames from 'classnames';
import html2canvas from 'html2canvas';
import { saveAs } from 'filesaver.js';
import { bindActionsAndConnect, fileNameNow } from 'utils';
import { CROTCHET_SIZE_OPTIONS } from 'constants';
import { Button, NumberPicker } from 'components/ui';
import { CanvasControls, ToolsControls } from 'components/crochet';
import './ToolBar.scss';


class ToolBar extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    canRedo: PropTypes.bool.isRequired,
    canUndo: PropTypes.bool.isRequired,
    cellSize: PropTypes.number.isRequired,
    tool: PropTypes.object.isRequired
  };

  onCellSizeChange = cellSize => {
    const { actions: { crochetCellSizeChange } } = this.props;
    crochetCellSizeChange(cellSize);
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

  onDownloadImage = () => {
    const crochetElement = document.getElementById('crochet');

    this.enableCrochetScrolling();
    html2canvas(crochetElement, {
      onrendered: canvas => {
        canvas.toBlob(blob => {
          saveAs(blob, fileNameNow('plik', 'png'));
        });
      }
    }).then(() => {
      this.disableCrochetScrolling();
    });
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

  disableCrochetScrolling = () => {
    const crochetContainerElement = document.get('crochet-container');
  };

  enableCrochetScrolling = () => {
    const crochetContainerElement = document.get('crochet-container');
  };

  render() {
    const {
      actions: { toolChoose },
      canRedo,
      canUndo,
      cellSize,
      tool: { toolId }
    } = this.props;

    return (
      <div
        className={classNames(
          'toolbar'
        )}>
        <div className="undo-redo">
          <Button
            className="undo"
            isDisabled={!canUndo}
            onClick={this.onUndo}>
            Cofnij
          </Button>
          <Button
            className="redo"
            isDisabled={!canRedo}
            onClick={this.onRedo}>
            Ponów
          </Button>
        </div>

        <ToolsControls
          toolId={toolId}
          onToolClick={toolChoose} />

        <CanvasControls
          onAdd10Columns={this.onAdd10Columns}
          onAdd10Rows={this.onAdd10Rows}
          onAddColumn={this.onAddColumn}
          onAddRow={this.onAddRow}
          onMirrorHorizontal={this.onMirrorHorizontal}
          onMirrorVertical={this.onMirrorVertical} />

        <Button onClick={this.onDownloadImage}>
          Pobierz do druku
        </Button>

        <NumberPicker
          value={cellSize}
          values={CROTCHET_SIZE_OPTIONS}
          onChange={this.onCellSizeChange} />
      </div>
    );
  }
}

export default bindActionsAndConnect(ToolBar, state => ({
  tool: state.tool
}));
