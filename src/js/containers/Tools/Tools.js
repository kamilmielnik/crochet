import React, { Component, PropTypes } from 'react';
import _ from 'underscore';
import classNames from 'classnames';
import html2canvas from 'html2canvas';
import { saveAs } from 'filesaver.js';
import { bindActionsAndConnect, fileNameNow } from 'utils';
import { TOOLS } from 'constants';
import { Button } from 'components/ui';
import './Tools.scss';

const sortedTools = _(TOOLS).sortBy('order');
const tools = sortedTools.map(({ toolId, name, group }) => ({
  label: name,
  value: toolId,
  group
}));

const toolsGroups = _(tools).groupBy('group');

class Tools extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    canRedo: PropTypes.bool.isRequired,
    canUndo: PropTypes.bool.isRequired,
    tool: PropTypes.object.isRequired
  };

  onCrochetAdd10Rows = () => {
    const { actions: { crochetAddRows } } = this.props;
    crochetAddRows(10);
  };

  onCrochetAddRow = () => {
    const { actions: { crochetAddRows } } = this.props;
    crochetAddRows(1);
  };

  onCrochetAdd10Columns = () => {
    const { actions: { crochetAddColumns } } = this.props;
    crochetAddColumns(10);
  };

  onCrochetAddColumn = () => {
    const { actions: { crochetAddColumns } } = this.props;
    crochetAddColumns(1);
  };

  onDownloadImage = () => {
    const crochetElement = document.getElementById('crochet');

    html2canvas(crochetElement, {
      onrendered: canvas => {
        canvas.toBlob(blob => {
          saveAs(blob, fileNameNow('plik', 'png'));
        });
      }
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

  render() {
    const {
      actions: { toolChoose },
      canRedo,
      canUndo,
      tool: { toolId }
    } = this.props;

    return (
      <div
        className={classNames(
          'tools'
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

        <div className="patterns">
          {_(toolsGroups).map((group, groupKey) => (
            <div key={groupKey} className="patterns-group">
              {group.map(({ value, label }) => {
                const { height, imageUrl, iconUrl, width } = TOOLS[value];
                const urlToShow = imageUrl || iconUrl;
                return (
                  <Button
                    key={value}
                    className={classNames(
                      'pattern',
                      {
                        active: value === toolId
                      }
                    )}
                    onClick={() => toolChoose(value)}>
                    {urlToShow && (
                      <div
                        className={classNames(
                          'pattern-image',
                          `height-${height}`,
                          `width-${width}`
                        )}
                        style={{
                          backgroundImage: `url(${urlToShow})`
                        }} />
                    )}
                    {!urlToShow && label}
                  </Button>
                );
              })}
            </div>
          ))}
        </div>

        <div className="canvas-control">
          <Button onClick={this.onCrochetAddRow}>
            Dodaj wiersz
          </Button>
          <Button onClick={this.onCrochetAdd10Rows}>
            Dodaj 10 wierszy
          </Button>
          <Button onClick={this.onCrochetAddColumn}>
            Dodaj kolumnę
          </Button>
          <Button onClick={this.onCrochetAdd10Columns}>
            Dodaj 10 kolumn
          </Button>
          <Button onClick={this.onMirrorVertical}>
            Odb. lustrz. pion
          </Button>
          <Button onClick={this.onMirrorHorizontal}>
            Odb. lustrz. poziom
          </Button>
          <Button onClick={this.onDownloadImage}>
            Pobierz do druku
          </Button>
        </div>
      </div>
    );
  }
}

export default bindActionsAndConnect(Tools, state => ({
  tool: state.tool
}));
