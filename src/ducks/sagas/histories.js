import { all, takeEvery, select, call, put } from 'redux-saga/effects';
import {
  REQUEST_FETCH,
  FETCH_START,
  fetchStart,
  fetchSuccess,
  fetchFail,
  setRows,
} from '../modules/histories';
import { getHistory } from '../../assets/js/requests';

// Helpers

// Workers
function* requestFetchSaga({ by, fab, eqp, from, to }) {
  const { isLoading } = yield select(state => state.histories);
  yield isLoading || put(fetchStart({ by, fab, eqp, from, to }));
}

function* fetchStartSaga({ by, fab, eqp, from, to }) {
  const { data, success } = yield call(getHistory, by, fab, eqp, from, to);
  yield put(success ? fetchSuccess() : fetchFail());
  const dummyData = [...Array(10)].map((v, i) =>
    [...Array(20)].reduce(
      (acc, cur, idx) => ({ ...acc, [`COL_${idx}`]: Math.random() }),
      { key: `${i}` },
    ),
  );
  yield put(setRows({ rows: dummyData }));
}

// Watchers
function* watchRequestFetch() {
  yield takeEvery(REQUEST_FETCH, requestFetchSaga);
}

function* watchFetchStart() {
  yield takeEvery(FETCH_START, fetchStartSaga);
}

export default function* historiesSaga() {
  yield all([watchRequestFetch(), watchFetchStart()]);
}
