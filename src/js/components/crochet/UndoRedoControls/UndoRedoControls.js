import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { PureRender } from 'components/base';
import { Button } from 'components/ui';
import './UndoRedoControls.scss';

export default class UndoRedoControls extends PureRender {
  static propTypes = {
    canRedo: PropTypes.bool.isRequired,
    canUndo: PropTypes.bool.isRequired,
    onRedoClick: PropTypes.func.isRequired,
    onUndoClick: PropTypes.func.isRequired
  };

  render() {
    const {
      canRedo,
      canUndo,
      onRedoClick,
      onUndoClick
    } = this.props;

    return (
      <div className="undo-redo-controls">
        <div className="controls">
          <Button
            className="undo"
            isDisabled={!canUndo}
            type="secondary"
            onClick={onUndoClick}>
            Cofnij
          </Button>

          <Button
            className="redo"
            isDisabled={!canRedo}
            type="secondary"
            onClick={onRedoClick}>
            Ponów
          </Button>
        </div>

        <div className="keys">
          <div
            className={classNames(
              'undo',
              {
                'is-disabled': !canUndo
              }
            )}>
            Ctrl + Z
          </div>

          <div
            className={classNames(
              'redo',
              {
                'is-disabled': !canRedo
              }
            )}>
            Ctrl + Y
          </div>
        </div>
      </div>
    );
  }
}
