import React, { Component } from 'react';

export default class NotFound extends Component {
  render() {
    return (
      <section>
        <h1>
          Ups! Coś poszło nie tak.
          Możesz poskarżyć się autorowi i przekazać mu następujący komunikat.
        </h1>
        <code>
          {window.location.hash} not found!
        </code>
      </section>
    );
  }
}
