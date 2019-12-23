const saveToLocalstorage = (key, data) => {
  return new Promise((resolve, reject) => {
    localStorage.setItem(key, JSON.stringify(data), err =>
      err ? reject(err) : resolve(state)
    );
  });
};

export const persistMiddleware = store => (next, args) => action => {
  const r = next(action);

  if (r && typeof r.then === 'function') {
    return next(action).then(d => {
      return saveToLocalstorage(
        'store-notes',
        store.getState().notes
      ).then(() => Promise.resolve(d));
    });
  }

  return saveToLocalstorage('store-notes', store.getState().notes).then(() =>
    Promise.resolve(r)
  );
};
