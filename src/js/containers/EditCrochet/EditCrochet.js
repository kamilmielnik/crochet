import React, { Component, PropTypes } from 'react';
import html2canvas from 'html2canvas';
import { saveAs } from 'filesaver.js';
import { bindActionsAndConnect, fileNameNow } from 'utils';
import { CROTCHET_SIZE_OPTIONS, PERSISTENCE_TIMEOUT } from 'constants';
import { canApplyTool } from 'models/collisions';
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

  constructor(props) {
    super(props);
    this.isSaving = false;
  }

  componentWillMount = () => {
    const { actions: { crochetLoad, crochetSave, projectsLoad }, params: { id } } = this.props;
    projectsLoad();
    crochetLoad(id);

    this.autoSave = setInterval(() => {
      const { crochet: { currentState: crochet } } = this.props;
      this.isSaving = true;
      crochetSave(id, crochet, () => {
        this.isSaving = false;
      });
    }, PERSISTENCE_TIMEOUT);
    window.onbeforeunload = this.onBeforeUnload;
  };

  componentWillUnmount = () => {
    this.autoSave = clearInterval(this.autoSave);
    window.onbeforeunload = undefined;
  };

  onBeforeUnload = event => {
    if (this.isSaving) {
      event.returnValue = null;
      return null;
    }

    return undefined;
  };

  onCellClick = (rowIndex, columnIndex) => {
    const {
      actions: { crochetApplyTool },
      crochet: { currentState: { canvas } },
      tool: { toolId }
    } = this.props;

    const row = canvas[rowIndex];
    const currentToolId = row && row[columnIndex];
    if (currentToolId !== undefined && canApplyTool(canvas, { rowIndex, columnIndex }, toolId)) {
      crochetApplyTool(canvas, rowIndex, columnIndex, toolId);
    }
  };

  onCellSizeChange = cellSize => {
    const { actions: { crochetCellSizeChange } } = this.props;
    crochetCellSizeChange(cellSize);
  };

  onDownloadImage = () => {
    const projectName = this.getProjectName();
    const crochetElement = document.getElementsByClassName('crochet')[0];
    html2canvas(crochetElement, {
      onrendered: canvas => {
        canvas.toBlob(blob => {
          saveAs(blob, fileNameNow(projectName, 'png'));
        });
      }
    });
  };

  onExport = () => {
    const { crochet: { currentState: crochet } } = this.props;
    const project = this.getProject();
    const projectName = this.getProjectName();
    const filename = `${projectName}.json`;
    const data = { crochet, project };
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    saveAs(blob, filename);
  };

  onGoToProjects = event => {
    event.preventDefault();
    this.componentWillUnmount();
    const {
      actions: { crochetSave, redirect },
      crochet: { currentState: crochet },
      params: { id }
    } = this.props;
    crochetSave(id, crochet, () => redirect('/projekty'));
  };

  getProjectName = () => {
    const { name } = this.getProject();
    return name;
  };

  getProject = () => {
    const { crochet: { currentState: { projectId } }, projects } = this.props;
    const project = projects.find(({ id }) => id === projectId) || {};
    return project;
  };

  render() {
    const {
      crochet: {
        futureActions,
        pastActions,
        currentState: {
          canvas,
          cellSize,
          areEmptyCellsHighlighted
        }
      }
    } = this.props;

    const projectName = this.getProjectName();

    const controls = (
      <div>
        <NumberPicker
          value={cellSize}
          values={CROTCHET_SIZE_OPTIONS}
          onChange={this.onCellSizeChange} />

        <Button onClick={this.onDownloadImage}>
          Pobierz do druku
        </Button>

        <Button onClick={this.onExport}>
          Eksportuj
        </Button>

        <Link to="/projekty" onClick={this.onGoToProjects}>
          <Button>
            Twoje projekty
          </Button>
        </Link>
      </div>
    );

    return (
      <Menu controls={controls} title={`Edycja - ${projectName}`}>
        <div className="edit-crochet">
          <div className="tools-container">
            <ToolBar
              areEmptyCellsHighlighted={areEmptyCellsHighlighted}
              canUndo={pastActions.length > 0}
              canRedo={futureActions.length > 0}
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
