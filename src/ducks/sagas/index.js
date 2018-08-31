import { all } from 'redux-saga/effects';
import historiesSaga from './histories';
import treesSaga from './trees';

export default function* rootSaga() {
  yield all([historiesSaga(), treesSaga()]);
}
