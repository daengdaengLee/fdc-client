import { all, takeEvery, select, call, put } from 'redux-saga/effects';
import {
  REQUEST_FETCH,
  FETCH_START,
  fetchStart,
  fetchSuccess,
  fetchFail,
  setParams,
  setSelected,
} from '../modules/parameters';
import { getParameters } from '../../assets/js/requests';

// Helpers

// Workers
function* requestFetchSaga({ fab, mod, from, to, lot }) {
  const { isLoading } = yield select(state => state.trees);
  yield isLoading || put(fetchStart({ fab, mod, from, to, lot }));
}

function* fetchStartSaga({ fab, mod, from, to, lot }) {
  const { data: params, success } = yield call(
    getParameters,
    fab,
    mod,
    from,
    to,
    lot,
  );
  yield put(success ? fetchSuccess() : fetchFail());
  yield put(
    setParams({
      params: params.map(param => ({ ...param, key: param.PARAM_NAME })),
    }),
  );
  yield put(
    setSelected({
      selected: params.slice(0, 1).map(param => param.PARAM_NAME),
    }),
  );
}

// Watchers
function* watchRequestFetch() {
  yield takeEvery(REQUEST_FETCH, requestFetchSaga);
}

function* watchFetchStart() {
  yield takeEvery(FETCH_START, fetchStartSaga);
}

export default function* parametersSaga() {
  yield all([watchRequestFetch(), watchFetchStart()]);
}
