import 'node-normalize-scss/_normalize.scss';
import 'styles/main.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import TouchEmulator from 'touch-emulator';
import configureStore from './store/configureStore';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';

TouchEmulator.template = () => ({ display: 'none' });
TouchEmulator();

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
    - https://github.com/Flipboard/react-canvas
    - bug z zapisywaniem w png tylko czesci widzialenj, przez overflow: auto w .crochet-container
    - pobierz do pliku json
    - zaladuj z pliku json
  TODO MEDIUM:
    - usuwanie projektu
  TODO LOW:
    - dodac spinner na componentDidMount w EditCrochet
    - numerki wierszy/kolumn
    - podswietl puste pola
*/
