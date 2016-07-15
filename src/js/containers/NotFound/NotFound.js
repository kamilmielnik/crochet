import React, { Component } from 'react';
import { Link } from 'react-router';
import Menu from '../Menu/Menu';
import { Button } from 'components/ui';

export default class NotFound extends Component {
  render() {
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
        <section className="not-found">
          <h1 className="danger">
            Ups! Coś poszło nie tak.
          </h1>

          <h2 className="danger">
            Możesz poskarżyć się autorowi i przekazać mu następujący komunikat:
          </h2>

          <code>
            {window.location.hash} not found!
          </code>
        </section>
      </Menu>
    );
  }
}
