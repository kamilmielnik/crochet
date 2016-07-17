import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Button } from 'components/ui';
import './Project.scss';

export default class Project extends Component {
  static propTypes = {
    project: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired
  };

  onDeleteClick = () => {
    const { project: { id }, onDelete } = this.props;
    onDelete(id);
  };

  render() {
    const { project: { crochetId, id, name } } = this.props;

    return (
      <div className="project">
        <Link key={id} className="name" to={`/edycja/${crochetId}`}>
          <Button type="secondary">
            {name}
          </Button>
        </Link>

        <Button type="danger" className="delete" onClick={this.onDeleteClick}>
          Usuń
        </Button>
      </div>
    );
  }
}
