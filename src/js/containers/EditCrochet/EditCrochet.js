import React, { Component, PropTypes } from 'react';
import html2canvas from 'html2canvas';
import { saveAs } from 'filesaver.js';
import { bindActionsAndConnect, fileNameNow } from 'utils';
import { CROTCHET_SIZE_OPTIONS, PERSISTENCE_TIMEOUT } from 'constants';
import { Link } from 'react-router';
import Menu from '../Menu/Menu';
import ToolBar from '../ToolBar/ToolBar';
import { Button, NumberPicker } from 'components/ui';
import { Crochet } from 'components/crochet';
import './EditCrochet.scss';

class EditCrochet extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    crochet: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    projects: PropTypes.array.isRequired,
    tool: PropTypes.object.isRequired
  };

  componentWillMount = () => {
    const { actions: { crochetLoad, crochetSave, projectsLoad }, params: { id } } = this.props;
    projectsLoad();
    crochetLoad(id);

    this.autoSave = setInterval(() => {
      const { crochet: { present: crochet } } = this.props;
      crochetSave(id, crochet);
    }, PERSISTENCE_TIMEOUT);
  };

  componentWillUnmount = () => {
    this.autoSave = clearInterval(this.autoSave);
  };

  onCellSizeChange = cellSize => {
    const { actions: { crochetCellSizeChange } } = this.props;
    crochetCellSizeChange(cellSize);
  };

  onDownloadImage = () => {
    const crochetElement = document.getElementsByClassName('crochet')[0];
    html2canvas(crochetElement, {
      onrendered: canvas => {
        canvas.toBlob(blob => {
          saveAs(blob, fileNameNow('plik', 'png'));
        });
      }
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

  render() {
    const {
      crochet: {
        future,
        past,
        present: {
          projectId,
          canvas,
          cellSize,
          areEmptyCellsHighlighted
        }
      },
      projects
    } = this.props;

    const { name } = projects.find(project => project.id === projectId) || {};

    const controls = (
      <div>
        <NumberPicker
          value={cellSize}
          values={CROTCHET_SIZE_OPTIONS}
          onChange={this.onCellSizeChange} />

        <Button onClick={this.onDownloadImage}>
          Pobierz do druku
        </Button>

        <Link to="/projekty">
          <Button>
            Twoje projekty
          </Button>
        </Link>
      </div>
    );

    return (
      <Menu controls={controls} title={`Edycja - ${name}`}>
        <div className="edit-crochet">
          <div className="tools-container">
            <ToolBar
              areEmptyCellsHighlighted={areEmptyCellsHighlighted}
              canUndo={past.length > 0}
              canRedo={future.length > 0}
              cellSize={cellSize} />
          </div>

          <div className="crochet-container">
            <Crochet
              areEmptyCellsHighlighted={areEmptyCellsHighlighted}
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
  projects: state.projects,
  tool: state.tool
}));
