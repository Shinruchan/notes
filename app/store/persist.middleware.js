const saveToLocalStorage = (keys, store) => {
  return new Promise(resolve => {
    keys.forEach(key => {
      localStorage.setItem(`store-${key}`, JSON.stringify(store[key]));
    });

    resolve();
  });
};

export const persistMiddleware = (keys, initialState) => {
  keys.forEach(key => {
    const data = JSON.parse(localStorage.getItem(`store-${key}`));
    if (data) initialState[key] = data;
  });

  return store => (next, args) => action => {
    const r = next(action);

    if (r && typeof r.then === 'function') {
      return next(action).then(d => {
        return saveToLocalStorage(keys, store.getState()).then(() =>
          Promise.resolve(d)
        );
      });
    }

    return saveToLocalStorage(keys, store.getState()).then(() =>
      Promise.resolve(r)
    );
  };
};
