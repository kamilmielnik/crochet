import React, { Component, PropTypes } from 'react';
import { bindActionsAndConnect, formatPercent } from 'utils';
import storage from 'storage';
import { Link } from 'react-router';
import Menu from '../Menu/Menu';
import { Project } from 'components/projects';
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

  onDeleteProjectClick = projectId => {
    const { actions: { projectDelete } } = this.props;
    projectDelete(projectId);
  };

  onFileRead = event => {
    const { actions: { handleError, projectNew, redirect } } = this.props;
    try {
      const fileContents = JSON.parse(event.target.result);
      const { crochet, project } = fileContents;
      const { id: crochetId, projectId } = crochet;
      projectNew(
        {
          projectId,
          crochetId,
          crochet,
          project
        },
        () => redirect(`/edycja/${crochetId}`)
      );
    } catch (error) {
      handleError(`${error.toString()}\n${error.stack}`);
    }
  };

  onImport = event => {
    const file = event.target.files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = this.onFileRead;
      fileReader.readAsText(file);
    }
  };

  render() {
    const { projects } = this.props;
    const numberOfProjects = projects.length;

    const controls = (
      <div>
        <input id="file" type="file" onChange={this.onImport} />
        <label htmlFor="file">
          <Button>
            Importuj projekt
          </Button>
        </label>

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

          {projects.map((project, projectIndex) => (
            <Project
              key={projectIndex}
              project={project}
              onDelete={this.onDeleteProjectClick} />
          ))}
        </section>
      </Menu>
    );
  }
}

export default bindActionsAndConnect(Projects, state => ({
  projects: state.projects
}));
