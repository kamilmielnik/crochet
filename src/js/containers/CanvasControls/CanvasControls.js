import React, { PropTypes } from 'react';
import classNames from 'classnames';
import html2canvas from 'html2canvas';
import { saveAs } from 'filesaver.js';
import { bindActionsAndConnect, fileNameNow } from 'utils';
import { PureRender } from 'components/base';
import { Button } from 'components/ui';

class CanvasControls extends PureRender {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    crochet: PropTypes.object.isRequired,
    projectName: PropTypes.string
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
    const { actions: { handleError }, projectName } = this.props;
    try {
      const crochetElement = document.getElementsByClassName('crochet')[0];
      html2canvas(crochetElement, {
        onrendered: canvas => {
          canvas.toBlob(blob => {
            saveAs(blob, fileNameNow(projectName, 'png'));
          });
        }
      });
    } catch (error) {
      handleError(`${error.toString()}\n${error.stack}`);
    }
  };

  onExport = () => {
    const {
      actions: { handleError },
      crochet: { currentState: crochet },
      projectName
    } = this.props;
    try {
      const project = this.getProject();
      const filename = `${projectName}.json`;
      const data = { crochet, project };
      const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
      saveAs(blob, filename);
    } catch (error) {
      handleError(`${error.toString()}\n${error.stack}`);
    }
  };

  onHighlightEmpty = () => {
    const {
      actions: { crochetHighlightEmpty },
      crochet: { currentState: { areEmptyCellsHighlighted } }
    } = this.props;
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

  render() {
    const {
      crochet: {
        currentState: {
          areEmptyCellsHighlighted
        }
      }
    } = this.props;

    return (
      <div className="canvas-controls">
        <Button type="secondary" onClick={this.onAddRow}>
          Dodaj wiersz
        </Button>
        <Button type="secondary" onClick={this.onAdd10Rows}>
          Dodaj 10 wierszy
        </Button>
        <Button type="secondary" onClick={this.onAddColumn}>
          Dodaj kolumnę
        </Button>
        <Button type="secondary" onClick={this.onAdd10Columns}>
          Dodaj 10 kolumn
        </Button>
        <Button type="secondary" onClick={this.onMirrorVertical}>
          Odbicie lustrzane pion
        </Button>
        <Button type="secondary" onClick={this.onMirrorHorizontal}>
          Odbicie lustrzane poziom
        </Button>
        <Button
          type="secondary"
          className={classNames({
            active: areEmptyCellsHighlighted
          })}
          onClick={this.onHighlightEmpty}>
          Podświetl puste
        </Button>
        <Button type="secondary" onClick={this.onDownloadImage}>
          Pobierz do druku (PNG)
        </Button>
        <Button type="secondary" onClick={this.onExport}>
          Eksportuj projekt (JSON)
        </Button>
      </div>
    );
  }
}

export default bindActionsAndConnect(CanvasControls, state => ({
  crochet: state.crochet
}));
