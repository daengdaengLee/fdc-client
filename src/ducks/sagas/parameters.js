import { all, takeEvery, select, call, put } from 'redux-saga/effects';
import {
  REQUEST_FETCH,
  FETCH_START,
  fetchStart,
  fetchSuccess,
  fetchFail,
  setParams,
} from '../modules/parameters';
import { getTree } from '../../assets/js/requests';

// Helpers

// Workers
function* requestFetchSaga({ fab, eqp, from, to, lot }) {
  const { isLoading } = yield select(state => state.trees);
  yield isLoading || put(fetchStart({ fab, eqp, from, to, lot }));
}

function* fetchStartSaga({ fab, eqp, from, to, lot }) {
  const { data, success } = yield call(getTree, fab, eqp, from, to, lot);
  yield put(success ? fetchSuccess() : fetchFail());
  const dummyData = [
    // data형식.
    {
      test:
      {
        PARAM_NAME: 'parameter_1',
        PARAM_INFO: 'paremeter_1',
      },
    },
  ];

  yield put(setParams({ nodes: dummyData }));
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
