import { all, takeEvery, select, call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import {
  FETCH_START,
  CLICK_FAB,
  SET_FAB,
  CLICK_NODE,
  fetchStart,
  fetchSuccess,
  fetchFail,
  setNodes,
  setFab,
  setSelectedNodes,
  CLICK_REAL_TIME_VIEW,
  CLICK_LOT_WAFER_VIEW,
  SET_SELECTED_NODES,
  SET_NODES,
} from '../modules/trees';
import { getTree } from '../../assets/js/requests';
import {
  requestFetch as requestFetchHistories,
  setBy,
} from '../modules/histories';

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
  yield put(setNodes({ nodes: [] }));
  yield put(push('/'));
  yield put(fetchStart({ fab }));
}

function* clickNodeSaga({ node }) {
  const { selected } = yield select(state => state.trees);
  const selectedNodes = selected.includes(node) ? [] : [node];
  yield put(setSelectedNodes({ nodes: selectedNodes }));
}

function* clickRealTimeViewSaga() {}

function* clickLotWaferViewSaga() {
  const {
    dates: { from, to },
    histories: { by },
    trees: { selected: selectedMod, fab },
  } = yield select(state => state);
  yield put(
    requestFetchHistories({
      by,
      fab,
      mod: selectedMod[0],
      from,
      to,
    }),
  );
}

function* setNodesSaga() {
  yield put(setSelectedNodes({ nodes: [] }));
}

function* setSelectedNodesSaga() {
  yield put(push('/'));
  yield put(setBy({ by: 'lot' }));
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

function* watchClickRealTimeView() {
  yield takeEvery(CLICK_REAL_TIME_VIEW, clickRealTimeViewSaga);
}

function* watchClickLotWaferView() {
  yield takeEvery(CLICK_LOT_WAFER_VIEW, clickLotWaferViewSaga);
}

function* watchSetNodes() {
  yield takeEvery(SET_NODES, setNodesSaga);
}

function* watchSetSelectedNodes() {
  yield takeEvery(SET_SELECTED_NODES, setSelectedNodesSaga);
}

export default function* treesSaga() {
  yield all([
    watchFetchStart(),
    watchClickFab(),
    watchSetFab(),
    watchClickNode(),
    watchClickRealTimeView(),
    watchClickLotWaferView(),
    watchSetNodes(),
    watchSetSelectedNodes(),
  ]);
}
