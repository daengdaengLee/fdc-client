import { all } from 'redux-saga/effects';
import historiesSaga from './histories';
import treesSaga from './trees';
import parametersSaga from './parameters';
import contextMenusSaga from './context-menus';
import datesSaga from './dates';
import routesSaga from './routes';

export default function* rootSaga() {
  yield all([
    historiesSaga(),
    treesSaga(),
    parametersSaga(),
    contextMenusSaga(),
    datesSaga(),
    routesSaga(),
  ]);
}
