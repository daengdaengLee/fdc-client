import { all, takeEvery } from 'redux-saga/effects';
import { PUSH } from '../modules/routes';
import legendNoti from '../../components/2-molecules/legend';

// Workers
function* pushSaga() {
  yield legendNoti.destroy();
}

// Watchers
function* watchPush() {
  yield takeEvery(PUSH, pushSaga);
}

export default function* routesSaga() {
  yield all([watchPush()]);
}