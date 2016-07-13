import React, { Component } from 'react';

export default class NotFound extends Component {
  render() {
    return (
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
    );
  }
}
