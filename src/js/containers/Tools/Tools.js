import React, { Component, PropTypes } from 'react';
import _ from 'underscore';
import classNames from 'classnames';
import { bindActionsAndConnect } from 'utils';
import { TOOLS } from 'constants';
import './Tools.scss';

const tools = _(TOOLS).map(({ toolId, name }) => ({
  label: name,
  value: toolId
}));

class Tools extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
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

  render() {
    const {
      actions: { toolChoose },
      tool: { toolId }
    } = this.props;

    return (
      <div
        className={classNames(
          'tools'
        )}>
        <div className="undo-redo">
          <div className="undo">
            Cofnij
          </div>
          <div className="redo">
            Ponów
          </div>
        </div>

        {tools.map(({ value, label }) => (
          <div
            key={value}
            className={classNames(
              'tool',
              {
                selected: value === toolId
              }
            )}
            onClick={() => toolChoose(value)}>
            {label}
          </div>
        ))}

        <div className="canvas-control">
          <div onClick={this.onCrochetAddRow}>
            Dodaj wiersz
          </div>
          <div onClick={this.onCrochetAdd10Rows}>
            Dodaj 10 wierszy
          </div>
          <div onClick={this.onCrochetAddColumn}>
            Dodaj kolumnę
          </div>
          <div onClick={this.onCrochetAdd10Columns}>
            Dodaj 10 kolumn
          </div>
        </div>
      </div>
    );
  }
}

export default bindActionsAndConnect(Tools, state => ({
  tool: state.tool
}));
