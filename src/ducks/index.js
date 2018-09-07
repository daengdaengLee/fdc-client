import {
  combineReducers,
  createStore as _createStore,
  applyMiddleware,
  compose,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import histories from './modules/histories';
import trees from './modules/trees';
import parameters from './modules/parameters';
import contextMenus from './modules/context-menus';
import dates from './modules/dates';
import rootSaga from './sagas';

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  histories,
  trees,
  parameters,
  contextMenus,
  dates,
});

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
  process.env.NODE_ENV === 'production'
    ? compose
    : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const createStore = initState => {
  const store = _createStore(
    connectRouter(history)(rootReducer),
    initState,
    composeEnhancers(
      applyMiddleware(routerMiddleware(history), sagaMiddleware),
    ),
  );
  sagaMiddleware.run(rootSaga);
  return store;
};

export default createStore();
