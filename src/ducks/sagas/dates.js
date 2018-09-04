import { takeEvery, all, put } from 'redux-saga/effects';
import { SELECT_FROM, SELECT_TO, setFrom, setTo } from '../modules/dates';

// Workers
function* selectFromSaga({ date }) {
  yield put(setFrom({ date }));
}

function* selectToSaga({ date }) {
  yield put(setTo({ date }));
}

// Watchers
function* watchSelectFrom() {
  yield takeEvery(SELECT_FROM, selectFromSaga);
}

function* watchSelectTo() {
  yield takeEvery(SELECT_TO, selectToSaga);
}

export default function* datesSaga() {
  yield all([watchSelectFrom(), watchSelectTo()]);
}
