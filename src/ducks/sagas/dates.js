import { takeEvery, all, put, select } from 'redux-saga/effects';
import { push } from '../modules/routes';
import { SELECT_FROM, SELECT_TO, setFrom, setTo } from '../modules/dates';
import { setBy } from '../modules/histories';
import { getDateString, notiError } from '../../assets/js/utils';

// Workers
function* selectFromSaga({ date }) {
  const { by } = yield select(state => state.histories);
  yield put(setFrom({ date }));
  yield put(push({ location: 'main' }));
  yield put(setBy({ by }));
}

function* selectToSaga({ date }) {
  const selectedTimestamp = new Date(date).getTime();
  const today = getDateString();
  const todayTimestamp = new Date(today).getTime();
  if (selectedTimestamp > todayTimestamp)
    return notiError('Cannot select tomorrow!');
  const { by } = yield select(state => state.histories);
  yield put(setTo({ date }));
  yield put(push({ location: 'main' }));
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
