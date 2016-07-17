import React, { Component, PropTypes } from 'react';
import { bindActionsAndConnect } from 'utils';
import { Link } from 'react-router';
import Menu from '../Menu/Menu';
import { Button } from 'components/ui';

class ErrorDisplay extends Component {
  static propTypes = {
    error: PropTypes.string
  };

  render() {
    const { error } = this.props;

    const controls = (
      <div>
        <Link to="/projekty">
          <Button>
            Twoje projekty
          </Button>
        </Link>
      </div>
    );

    return (
      <Menu controls={controls} title="Błąd">
        <section className="error">
          <h1 className="danger">
            Ups! Coś poszło nie tak.
          </h1>

          <h2 className="danger">
            Możesz poskarżyć się autorowi i przekazać mu następujący komunikat:
          </h2>

          <code>
            {error}
          </code>
        </section>
      </Menu>
    );
  }
}

export default bindActionsAndConnect(ErrorDisplay, state => ({
  error: state.error
}));
