import React from 'react';
import { Route, Redirect } from 'react-router';

import About from 'containers/About/About';
import App from 'components/App';
import EditCrochet from 'containers/EditCrochet/EditCrochet';
import ErrorDisplay from 'containers/ErrorDisplay/ErrorDisplay';
import NewProject from 'containers/NewProject/NewProject';
import NotFound from 'containers/NotFound/NotFound';
import Projects from 'containers/Projects/Projects';

export default ([
  <Redirect key="initial-redirect" from="/" to="/o-programie" />,

  <Route key="app" path="/" component={App}>
    <Route path="404" component={NotFound} />
    <Route path="blad" component={ErrorDisplay} />
    <Route path="edycja/:id" component={EditCrochet} />
    <Route path="nowy-projekt" component={NewProject} />
    <Route path="o-programie" component={About} />
    <Route path="projekty" component={Projects} />

    <Redirect from="*" to="/404" />
  </Route>
]);
