import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers/rootReducer';

export const configureStore = preloadedState => {
  const middleswares = [];
  const middlewareEnhancer = applyMiddleware(...middleswares);

  const storeEnhancers = [middlewareEnhancer];

  const composedEnhancer = composeWithDevTools(...storeEnhancers);

  const store = createStore(rootReducer, preloadedState, composedEnhancer);

  if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
      module.hot.accept('../reducers/rootReducer', () => {
        const newRoorReducer = require('../reducers/rootReducer').default;
        store.replaceReducer(newRoorReducer);
      });
    }
  }

  return store;
};
