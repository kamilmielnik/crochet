import 'node-normalize-scss/_normalize.scss';
import 'styles/main.scss';
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
  TODO HIGH:
    - mutowac czy nie mutowac calego obiektu projects przy edycji gry? reducers/projects.js:47-54:
    - jakims cudem nie ladowac do pamieci calych projects
    - dodac spinner na componentDidMount w EditCrochet
    - nie dziala UNDO / REDO
    - uzyc Menu w NotFound
    - pobierz do pliku json
    - zaladuj z pliku json
    - bug z zapisywaniem w png tylko czesci widzialenj, przez overflow: auto w .crochet-container
    - https://github.com/Flipboard/react-canvas

  TODO LOW:
    - numerki wierszy/kolumn
    - podswietl puste pola
*/
