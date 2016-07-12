import React, { Component, PropTypes } from 'react';
import html2canvas from 'html2canvas';
import { saveAs } from 'filesaver.js';
import { bindActionsAndConnect, fileNameNow } from 'utils';
import { CROTCHET_SIZE_OPTIONS } from 'constants';
import Menu from '../Menu/Menu';
import ToolBar from '../ToolBar/ToolBar';
import { Button, NumberPicker } from 'components/ui';
import { Crochet } from 'components/crochet';
import './EditCrochet.scss';

class EditCrochet extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    crochet: PropTypes.object.isRequired,
    tool: PropTypes.object.isRequired
  };

  componentWillMount = () => {
    const { actions: { crochetNew } } = this.props;
    crochetNew();
  };

  onCellSizeChange = cellSize => {
    const { actions: { crochetCellSizeChange } } = this.props;
    crochetCellSizeChange(cellSize);
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

  onCellClick = (rowIndex, columnIndex) => {
    const {
      actions: { crochetApplyTool },
      crochet: { present: { canvas } },
      tool: { toolId }
    } = this.props;

    const currentToolId = canvas[rowIndex][columnIndex];
    if (currentToolId !== toolId) {
      crochetApplyTool(rowIndex, columnIndex, toolId);
    }
  };

  disableCrochetScrolling = () => {
    // const crochetContainerElement = document.getElementById('crochet-container');
  };

  enableCrochetScrolling = () => {
    // const crochetContainerElement = document.getElementById('crochet-container');
  };

  render() {
    const {
      crochet: {
        future,
        past,
        present: {
          canvas,
          cellSize
        }
      }
    } = this.props;

    const controls = (
      <div>
        <NumberPicker
          value={cellSize}
          values={CROTCHET_SIZE_OPTIONS}
          onChange={this.onCellSizeChange} />

        <Button onClick={this.onDownloadImage}>
          Pobierz do druku
        </Button>
      </div>
    );

    return (
      <Menu controls={controls} title="Edycja">
        <div className="edit-crochet">
          <div className="tools-container">
            <ToolBar
              canUndo={past.length > 0}
              canRedo={future.length > 0}
              cellSize={cellSize} />
          </div>

          <div className="crochet-container">
            <Crochet
              id="crochet"
              canvas={canvas}
              cellSize={cellSize}
              onCellClick={this.onCellClick} />
          </div>
        </div>
      </Menu>
    );
  }
}

export default bindActionsAndConnect(EditCrochet, state => ({
  crochet: state.crochet,
  tool: state.tool
}));
