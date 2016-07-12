import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import Button from '../Button/Button';
import EditableText from '../EditableText/EditableText';
import './NumberPicker.scss';

export default class NumberPicker extends Component {
  static propTypes = {
    className: PropTypes.string,
    formatter: PropTypes.func,
    orientation: PropTypes.oneOf(['horizontal', 'vertical']),
    type: PropTypes.oneOf(['primary', 'secondary']),
    value: PropTypes.number.isRequired,
    values: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
  };

  static defaultProps = {
    formatter: String,
    orientation: 'horizontal'
  };

  onAdd = () => {
    this.onChange(1);
  };

  onSubtract = () => {
    this.onChange(-1);
  };

  onChange = step => {
    const { value, values, onChange } = this.props;
    const numberOfValues = values.length;
    const indexOfValue = values.indexOf(value);
    const indexOfNewValue = indexOfValue + step;

    if (indexOfNewValue >= 0 && indexOfNewValue < numberOfValues) {
      const newValue = values[indexOfNewValue];
      onChange(newValue);
    }
  };

  render() {
    const {
      className,
      formatter,
      orientation,
      type,
      value,
      values
    } = this.props;

    const indexOfValue = values.indexOf(value);
    const canSubtract = indexOfValue > 0;
    const canAdd = indexOfValue < values.length - 1;

    return (
      <div
        className={classNames(
          'number-picker',
          orientation,
          className
        )}>
        <Button
          className="subtract"
          isDisabled={!canSubtract}
          type={type}
          onClick={this.onSubtract}>
          -
        </Button>

        <EditableText
          className="value"
          isDisabled={true}
          isEditing={true}
          text={formatter(value)} />

        <Button
          className="add"
          isDisabled={!canAdd}
          type={type}
          onClick={this.onAdd}>
          +
        </Button>
      </div>
    );
  }
}
