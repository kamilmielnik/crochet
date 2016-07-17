import 'node-normalize-scss/_normalize.scss';
import 'styles/main.scss';
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';

const store = configureStore(undefined, hashHistory);
const rootElement = document.getElementById('app');
const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render(
  <Provider store={store}>
    {renderContent()}
  </Provider>,
  rootElement
);

function renderContent() {
  if (process.env.NODE_ENV !== 'production') {
    const DevTools = require('./containers/DevTools').default;

    return (
      <div>
        <Router key="router" history={history} routes={routes} />
        <DevTools key="devtools" />
      </div>
    );
  }

  return (
    <div>
      <Router history={history} routes={routes} />
    </div>
  );
}

/*
  TODO LOW:
    - undoable - trzymac w pamieci tylko akcje potrafiace odwrocic stan, nie trzymac stanu, zwiekszyc limit do 1000
*/
