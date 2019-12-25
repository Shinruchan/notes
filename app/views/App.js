import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'redux-zero/react';

import { Notes } from './Notes';
import { Settings } from './Settings';
import { store } from '../store/store';

export const App = () => (
  <Provider store={store}>
    <HashRouter basename="app">
      <Switch>
        <Route path="/" exact component={Notes} />
        <Route path="/settings" exact component={Settings} />
      </Switch>
    </HashRouter>
  </Provider>
);
