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
  yield isLoading || put(fetchStart());
}

function* fetchStartSaga() {
  const { data: dataM10, success: successM10 } = yield call(getTree, 'M10');
  const { data: dataM14, success: successM14 } = yield call(getTree, 'M14');
  const success = successM10 && successM14;
  const nodes = { M10: dataM10, M14: dataM14 };
  yield put(success ? fetchSuccess() : fetchFail());
  yield put(setNodes({ nodes }));
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
