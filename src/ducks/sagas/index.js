import { all } from 'redux-saga/effects';
import historiesSaga from './histories';
import treesSaga from './trees';
import parametersSaga from './parameters';

export default function* rootSaga() {
  yield all([historiesSaga(), treesSaga(), parametersSaga()]);
}
