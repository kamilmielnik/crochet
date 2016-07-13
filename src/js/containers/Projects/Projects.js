import React, { Component, PropTypes } from 'react';
import _ from 'underscore';
import { bindActionsAndConnect } from 'utils';
import { Link } from 'react-router';
import Menu from '../Menu/Menu';
import { Button } from 'components/ui';
import './Projects.scss';

class Projects extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    projects: PropTypes.object.isRequired
  };

  render() {
    const { projects: { present: { list } } } = this.props;
    const projects = _(list);
    const numberOfProjects = projects.size();

    const controls = (
      <div>
        <Link to="/nowy-projekt">
          <Button>
            Nowy projekt
          </Button>
        </Link>
      </div>
    );

    return (
      <Menu controls={controls} title="Twoje projekty">
        <section className="projects">
          {numberOfProjects === 0 && (
            <div className="no-projects">
              Nie masz jeszcze żadnych projektów.

              <div className="buttons">
                <Link to="/nowy-projekt">
                  <Button>
                    Stwórz nowy projekt
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {projects.map(project => {
            const { id, name } = project;

            return (
              <Link key={id} to={`/edycja/${id}`}>
                <Button type="secondary" className="project">
                  {name}
                </Button>
              </Link>
            );
          })}
        </section>
      </Menu>
    );
  }
}

export default bindActionsAndConnect(Projects, state => ({
  projects: state.projects
}));
