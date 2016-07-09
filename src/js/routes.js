import React from 'react';
import { Route, Redirect } from 'react-router';

import App from 'components/App';
import EditCrochet from 'containers/EditCrochet/EditCrochet';
import NotFound from 'containers/NotFound/NotFound';

export default ([
  <Redirect key="initial-redirect" from="/" to="/edycja" />,

  <Route key="app" path="/" component={App}>
    <Route path="404" component={NotFound} />
    <Route path="edycja" component={EditCrochet} />

    <Redirect from="*" to="/404" />
  </Route>
]);
