import React, { Component, PropTypes } from 'react';
import { bindActionsAndConnect, generateId } from 'utils';
import { Link } from 'react-router';
import Menu from '../Menu/Menu';
import { Button, EditableText, Form, InputLabel } from 'components/ui';

class NewProject extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    newProject: PropTypes.object.isRequired
  };

  componentWillMount = () => {
    const { actions: { newProjectReset } } = this.props;
    newProjectReset();
  };

  onNameChange = name => {
    const { actions: { newProjectNameChange } } = this.props;
    newProjectNameChange(name);
  };

  onSubmit = () => {
    const { actions: { projectNew, redirect }, newProject: { name } } = this.props;
    const projectId = generateId('projekt');
    const crochetId = generateId('schemat');

    projectNew({ projectId, crochetId, name }, () => {
      redirect(`/edycja/${crochetId}`);
    });
  };

  render() {
    const { newProject: { name } } = this.props;

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
      <Menu controls={controls} title="Nowy projekt">
        <section className="new-project">
          <Form>
            <InputLabel>
              Podaj nazwę dla nowego projektu:
            </InputLabel>

            <EditableText
              autoFocus={true}
              isEditing={true}
              text={name}
              onChange={this.onNameChange} />

            <Button
              className="submit"
              isDisabled={!name}
              onClick={this.onSubmit}>
              Stwórz
            </Button>
          </Form>
        </section>
      </Menu>
    );
  }
}

export default bindActionsAndConnect(NewProject, state => ({
  newProject: state.newProject
}));
