import React, { Component, PropTypes } from 'react';
import { bindActionsAndConnect } from 'utils';
import Tools from '../Tools/Tools';
import { CrochetRow } from 'components/crochet';
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
    const { actions: { crochetApplyTool }, tool: { toolId } } = this.props;
    crochetApplyTool(rowIndex, columnIndex, toolId);
  }

  render() {
    const {
      actions,
      crochet: {
        canvas,
        patterns
      }
    } = this.props;

    return (
      <div className="edit-crochet">
        <div className="tools-container">
          <Tools />
        </div>

        <div className="crochet-container">
          <div className="crochet">
            {canvas.map((row, rowIndex) => (
              <CrochetRow
                key={rowIndex}
                className="row"
                row={row}
                rowIndex={rowIndex}
                onCellClick={this.onCellClick} />
            ))}
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
