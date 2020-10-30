import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootEpic, rootReducer } from './root';

const epicMiddleware = createEpicMiddleware();

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(epicMiddleware),
  ),
);

epicMiddleware.run(rootEpic);
