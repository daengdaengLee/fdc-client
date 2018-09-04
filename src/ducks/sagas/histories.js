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
function* requestFetchSaga({ by, fab, mod, from, to }) {
  const { isLoading } = yield select(state => state.histories);
  yield isLoading || put(fetchStart({ by, fab, mod, from, to }));
}

function* fetchStartSaga({ by, fab, mod, from, to }) {
  const { data: rows, success } = yield call(
    getHistory,
    by,
    fab,
    mod,
    from,
    to,
  );
  yield put(success ? fetchSuccess() : fetchFail());
  yield put(
    setRows({ rows: rows.map(row => ({ ...row, key: JSON.stringify(row) })) }),
  );
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
