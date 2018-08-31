import { all, takeEvery, select, call, put } from 'redux-saga/effects';
import {
  REQUEST_FETCH,
  FETCH_START,
  fetchStart,
  fetchSuccess,
  fetchFail,
  setNodes,
} from '../modules/trees';
import { getTree } from '../../assets/js/requests';

// Helpers

// Workers
function* requestFetchSaga({ fab }) {
  const { isLoading } = yield select(state => state.trees);
  yield isLoading || put(fetchStart({ fab }));
}

function* fetchStartSaga({ fab }) {
  const { data, success } = yield call(getTree, fab);
  yield put(success ? fetchSuccess() : fetchFail());
  const dummyData = [];
  yield put(setNodes({ nodes: dummyData }));
}

// Watchers
function* watchRequestFetch() {
  yield takeEvery(REQUEST_FETCH, requestFetchSaga);
}

function* watchFetchStart() {
  yield takeEvery(FETCH_START, fetchStartSaga);
}

export default function* treesSaga() {
  yield all([watchRequestFetch(), watchFetchStart()]);
}
