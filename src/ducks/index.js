import {
  combineReducers,
  createStore as _createStore,
  applyMiddleware,
  compose,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import histories from './modules/histories';
import trees from './modules/trees';
import parameters from './modules/parameters';
import contextMenus from './modules/context-menus';
import dates from './modules/dates';
import charts from './modules/charts';
import routes from './modules/routes';
import rootSaga from './sagas';

const rootReducer = combineReducers({
  histories,
  trees,
  parameters,
  contextMenus,
  dates,
  charts,
  routes,
});

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
  process.env.NODE_ENV === 'production'
    ? compose
    : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const createStore = initState => {
  const store = _createStore(
    rootReducer,
    initState,
    composeEnhancers(applyMiddleware(sagaMiddleware)),
  );
  sagaMiddleware.run(rootSaga);
  return store;
};

export default createStore();
