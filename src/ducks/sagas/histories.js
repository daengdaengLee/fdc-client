import { all, takeEvery, select, call, put } from 'redux-saga/effects';
import {
  REQUEST_FETCH,
  FETCH_START,
  fetchStart,
  fetchSuccess,
  fetchFail,
  setRows,
  SELECT_BY,
  setBy,
  requestFetch,
  SET_SELECTED_ROW_KEYS,
  SET_BY,
  setSelectedRowKeys,
  SET_ROWS,
} from '../modules/histories';
import { getHistory } from '../../assets/js/requests';
import { setSelected, setParams } from '../modules/parameters';

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

function* selectBySaga({ by }) {
  const {
    histories: { isLoading, by: prevBy },
    dates: { from, to },
    trees: { selected: selectedMod, fab },
  } = yield select(state => state);
  if (isLoading || prevBy === by || !from || !to) {
    return;
  }
  yield put(setBy({ by }));
  yield put(requestFetch({ by, fab, mod: selectedMod[0], from, to }));
}

function* setBySaga() {
  yield put(setRows({ rows: [] }));
}

function* setRowsSaga() {
  yield put(setSelectedRowKeys({ keys: [] }));
}

function* setSelectedRowKeysSaga() {
  yield put(setSelected({ selected: [] }));
  yield put(setParams({ params: [] }));
}

// Watchers
function* watchRequestFetch() {
  yield takeEvery(REQUEST_FETCH, requestFetchSaga);
}

function* watchFetchStart() {
  yield takeEvery(FETCH_START, fetchStartSaga);
}

function* watchSelectBy() {
  yield takeEvery(SELECT_BY, selectBySaga);
}

function* watchSetBy() {
  yield takeEvery(SET_BY, setBySaga);
}

function* watchSetRows() {
  yield takeEvery(SET_ROWS, setRowsSaga);
}

function* watchSetSelectedRowKeys() {
  yield takeEvery(SET_SELECTED_ROW_KEYS, setSelectedRowKeysSaga);
}

export default function* historiesSaga() {
  yield all([
    watchRequestFetch(),
    watchFetchStart(),
    watchSelectBy(),
    watchSetBy(),
    watchSetRows(),
    watchSetSelectedRowKeys(),
  ]);
}
