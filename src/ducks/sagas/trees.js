import { all, takeEvery, select, call, put } from 'redux-saga/effects';
import {
  FETCH_START,
  fetchStart,
  fetchSuccess,
  fetchFail,
  setNodes,
  CLICK_FAB,
  setFab,
  SET_FAB,
  CLICK_NODE,
  setSelectedNodes,
} from '../modules/trees';
import { getTree } from '../../assets/js/requests';

// Helpers
const VALID_FABS = ['M10', 'M14'];

function* checkFetchPossible(fab) {
  const { isLoading } = yield select(state => state.trees);
  return VALID_FABS.includes(fab) && !isLoading;
}

// Workers
function* fetchStartSaga({ fab }) {
  const { data, success } = yield call(getTree, fab);
  yield put(success ? fetchSuccess() : fetchFail());
  yield put(setNodes({ nodes: data }));
}

function* clickFabSaga({ fab }) {
  const possible = yield call(checkFetchPossible, fab);
  yield possible && put(setFab({ fab: fab === undefined ? '' : fab }));
}

function* setFabSaga({ fab }) {
  yield put(fetchStart({ fab }));
}

function* clickNodeSaga({ node }) {
  const { selected } = yield select(state => state.trees);
  const selectedNodes = selected.includes(node) ? [] : [node];
  yield put(setSelectedNodes({ nodes: selectedNodes }));
}

// Watchers
function* watchFetchStart() {
  yield takeEvery(FETCH_START, fetchStartSaga);
}

function* watchClickFab() {
  yield takeEvery(CLICK_FAB, clickFabSaga);
}

function* watchSetFab() {
  yield takeEvery(SET_FAB, setFabSaga);
}

function* watchClickNode() {
  yield takeEvery(CLICK_NODE, clickNodeSaga);
}

export default function* treesSaga() {
  yield all([
    watchFetchStart(),
    watchClickFab(),
    watchSetFab(),
    watchClickNode(),
  ]);
}
