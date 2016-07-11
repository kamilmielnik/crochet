import React from 'react';
import { Route, Redirect } from 'react-router';

import App from 'components/App';
import EditCrochet from 'containers/EditCrochet/EditCrochet';
import Info from 'containers/Info/Info';
import NotFound from 'containers/NotFound/NotFound';

export default ([
  <Redirect key="initial-redirect" from="/" to="/info" />,

  <Route key="app" path="/" component={App}>
    <Route path="404" component={NotFound} />
    <Route path="info" component={Info} />
    <Route path="edycja" component={EditCrochet} />

    <Redirect from="*" to="/404" />
  </Route>
]);
