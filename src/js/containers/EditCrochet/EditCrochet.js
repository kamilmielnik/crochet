import React, { Component, PropTypes } from 'react';
import { bindActionsAndConnect } from 'utils';
import Tools from '../Tools/Tools';
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
  }

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
  }

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

    return (
      <div className="edit-crochet">
        <div className="tools-container">
          <Tools
            canUndo={past.length > 0}
            canRedo={future.length > 0}
            cellSize={cellSize} />
        </div>

        <div className="crochet-container">
          <div className="crochet">
            <Crochet
              id="crochet"
              canvas={canvas}
              cellSize={cellSize}
              onCellClick={this.onCellClick} />
          </div>
        </div>
      </div>
    );
  }
}

export default bindActionsAndConnect(EditCrochet, state => ({
  crochet: state.crochet,
  tool: state.tool
}));
