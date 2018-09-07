import { takeEvery, all, put, select } from 'redux-saga/effects';
import { SELECT_FROM, SELECT_TO, setFrom, setTo } from '../modules/dates';
import { setBy } from '../modules/histories';

// Workers
function* selectFromSaga({ date }) {
  const { by } = yield select(state => state.histories);
  yield put(setFrom({ date }));
  yield put(setBy({ by }));
}

function* selectToSaga({ date }) {
  const { by } = yield select(state => state.histories);
  yield put(setTo({ date }));
  yield put(setBy({ by }));
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
