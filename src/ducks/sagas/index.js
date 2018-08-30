import { all } from 'redux-saga/effects';
import tablesSaga from './tables';

export default function* rootSaga() {
  yield all([tablesSaga()]);
}
