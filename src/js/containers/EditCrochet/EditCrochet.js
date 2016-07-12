import React, { Component, PropTypes } from 'react';
import { bindActionsAndConnect } from 'utils';
import Menu from '../Menu/Menu';
import ToolBar from '../ToolBar/ToolBar';
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

    const menu = (
      <div>
        asdasd asd
      </div>
    );

    return (
      <Menu menu={menu} title="Edycja">
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
