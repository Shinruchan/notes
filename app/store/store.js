import createStore from 'redux-zero';
import { applyMiddleware } from 'redux-zero/middleware';
import { persistMiddleware } from './persist.middleware';

const INITIAL_STATE = {
  notes: [],
  themes: ['midnight', 'morning', 'cyberpunk', 'office'],
  theme: 'midnight'
};

const middlewares = applyMiddleware(
  persistMiddleware(['notes', 'theme'], INITIAL_STATE)
);

window.addEventListener('DOMContentLoaded', () => {
  document.documentElement.setAttribute('theme', INITIAL_STATE.theme);
});

export const store = createStore(INITIAL_STATE, middlewares);
