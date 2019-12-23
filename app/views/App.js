import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'redux-zero/react';

import { Notes } from './Notes';
import { store } from '../store/store';

export const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Notes} />
      </Switch>
    </BrowserRouter>
  </Provider>
);
