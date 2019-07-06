// The core logic of the store will go here.// The core logic of the store will go here.

const createStore = reducer => {
  let state;
  let listeners = [];

  const getState = listener => {
    listener(state);
  };

  const dispatch = action => {
    state = reducer(action, deepClone(state));
    listeners.forEach(l => {
      l(state);
    });
  };

  const subscribe = listener => {
    listener(state);
    listeners.push(listener);
  };

  return { getState, dispatch, subscribe };
};

function combineReducers(reducers) {
  return function finalReducer(action, state) {
    const nextState = {};
    for (let i = 0; i < reducers.length; i++) {
      const currentReducer = reducers[i].reducer;
      const feature = reducers[i].feature;
      const currentState = state[feature] || reducers[i].initialState || {};
      nextState[feature] = currentReducer(action, currentState);
    }
    return nextState;
  };
}

function deepClone(obj) {
  const finalObj = {};
  for (let key in obj) {
    if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
      finalObj[key] = deepClone(obj[key]);
    } else {
      finalObj[key] = obj[key];
    }
  }
  return finalObj;
}

export { createStore, combineReducers };
