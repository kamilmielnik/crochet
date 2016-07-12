import React, { PropTypes } from 'react';
import _ from 'underscore';
import classNames from 'classnames';
import { PureRender } from 'components/base';
import { Button } from 'components/ui';
import { TOOLS } from 'constants';
import './ToolsControls.scss';

const sortedTools = _(TOOLS).sortBy('order');
const tools = sortedTools.map(({ toolId, name, group }) => ({
  label: name,
  value: toolId,
  group
}));

const toolsGroups = _(tools).groupBy('group');

export default class ToolsControls extends PureRender {
  static propTypes = {
    toolId: PropTypes.number.isRequired,
    onToolClick: PropTypes.func.isRequired
  };

  render() {
    const { toolId, onToolClick } = this.props;

    return (
      <div className="tools-controls">
        {_(toolsGroups).map((group, groupKey) => (
          <div key={groupKey} className="tools-group">
            {group.map(({ value, label }) => {
              const { height, imageUrl, iconUrl, width } = TOOLS[value];
              const urlToShow = imageUrl || iconUrl;
              return (
                <Button
                  key={value}
                  className={classNames(
                    'tool',
                    {
                      active: value === toolId
                    }
                  )}
                  onClick={() => onToolClick(value)}>
                  {urlToShow && (
                    <div
                      className={classNames(
                        'tool-image',
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
    );
  }
}
