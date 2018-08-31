import { all } from 'redux-saga/effects';
import historiesSaga from './histories';

export default function* rootSaga() {
  yield all([historiesSaga()]);
}
