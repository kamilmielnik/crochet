import React, { PropTypes } from 'react';
import { PureRender } from 'components/base';
import { Button } from 'components/ui';

export default class CanvasControls extends PureRender {
  static propTypes = {
    onAdd10Columns: PropTypes.func.isRequired,
    onAdd10Rows: PropTypes.func.isRequired,
    onAddColumn: PropTypes.func.isRequired,
    onAddRow: PropTypes.func.isRequired,
    onMirrorHorizontal: PropTypes.func.isRequired,
    onMirrorVertical: PropTypes.func.isRequired
  };

  render() {
    const {
      onAdd10Columns,
      onAdd10Rows,
      onAddColumn,
      onAddRow,
      onMirrorHorizontal,
      onMirrorVertical
    } = this.props;

    return (
      <div className="canvas-control">
        <Button onClick={onAddRow}>
          Dodaj wiersz
        </Button>
        <Button onClick={onAdd10Rows}>
          Dodaj 10 wierszy
        </Button>
        <Button onClick={onAddColumn}>
          Dodaj kolumnę
        </Button>
        <Button onClick={onAdd10Columns}>
          Dodaj 10 kolumn
        </Button>
        <Button onClick={onMirrorVertical}>
          Odb. lustrz. pion
        </Button>
        <Button onClick={onMirrorHorizontal}>
          Odb. lustrz. poziom
        </Button>
      </div>
    );
  }
}
