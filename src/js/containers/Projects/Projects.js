import React, { Component, PropTypes } from 'react';
import { bindActionsAndConnect, formatPercent } from 'utils';
import storage from 'storage';
import { Link } from 'react-router';
import Menu from '../Menu/Menu';
import { Button } from 'components/ui';
import './Projects.scss';

class Projects extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    projects: PropTypes.array.isRequired
  };

  componentWillMount = () => {
    const { actions: { projectsLoad } } = this.props;
    projectsLoad();
  };

  render() {
    const { projects } = this.props;
    const numberOfProjects = projects.length;

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
          {numberOfProjects > 0 && (
            <div className="storage-usage">
              Zużycie pamięci: {formatPercent(storage.usage, 2)}
            </div>
          )}

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
            const { crochetId, name } = project;

            return (
              <Link key={crochetId} to={`/edycja/${crochetId}`}>
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
