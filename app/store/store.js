import createStore from 'redux-zero';
import uuid from 'uuid/v4';
import { applyMiddleware } from 'redux-zero/middleware';
import { persistMiddleware } from './persist.middleware';

const INITIAL_STATE = {
  notes: []
};

const notes = JSON.parse(localStorage.getItem('store-notes'));
if (notes) INITIAL_STATE.notes = notes;

/* INITIAL_STATE.notes = [
  { id: uuid(), title: 'test', body: 'test \n aaaa' },
  { id: uuid(), title: 'test', body: 'test \n aaaa' },
  { id: uuid(), title: 'test', body: 'test \n aaaa' },
  { id: uuid(), title: 'test2', body: 'test \n aawefwefaa', selected: true },
  { id: uuid(), title: 'test', body: 'test \n aaaa' },
  { id: uuid(), title: 'test', body: 'test \n aaaa' },
  {
    id: uuid(),
    title:
      'This one has a really really long title, longer than anything we ever expected',
    body: 'test \n aaaa'
  }
]; */

const middlewares = applyMiddleware(persistMiddleware);

export const store = createStore(INITIAL_STATE, middlewares);
