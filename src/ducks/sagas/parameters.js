import { all, takeEvery, select, call, put } from 'redux-saga/effects';
import {
  REQUEST_FETCH,
  FETCH_START,
  CLICK_PARAM,
  fetchStart,
  fetchSuccess,
  fetchFail,
  setParams,
  clickParam,
  setSelected,
  SET_SELECTED,
} from '../modules/parameters';
import { fetchStart as fetchStartCharts } from '../modules/charts';
import { getParameters } from '../../assets/js/requests';
import { _releaseG } from '../../components/2-molecules/chart/helpers';
import legendNoti from '../../components/2-molecules/legend';

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
    clickParam({
      param: params[0].PARAM_NAME,
    }),
  );
}

function* setSelectedSaga() {
  yield _releaseG(0);
}

function* clickParamSaga({ param }) {
  yield legendNoti.destroy();
  const {
    trees: { fab, selected: selectedMod },
    dates: { from, to },
    histories: { rows, selectedRowKeys },
    charts: { chartEl },
  } = yield select(state => state);
  const selectedRow = rows.find(row => selectedRowKeys.includes(row.key));
  const lot = !selectedRow ? '' : selectedRow.LOT_ID;
  const mod = selectedMod[0];
  if (!chartEl[0]) return;
  yield put(setSelected({ selected: [param] }));
  yield put(fetchStartCharts({ fab, mod, from, to, lot, param, chartId: 0 }));
}

// Watchers
function* watchRequestFetch() {
  yield takeEvery(REQUEST_FETCH, requestFetchSaga);
}

function* watchFetchStart() {
  yield takeEvery(FETCH_START, fetchStartSaga);
}

function* watchSetSelected() {
  yield takeEvery(SET_SELECTED, setSelectedSaga);
}

function* watchClickParam() {
  yield takeEvery(CLICK_PARAM, clickParamSaga);
}

export default function* parametersSaga() {
  yield all([
    watchRequestFetch(),
    watchFetchStart(),
    watchSetSelected(),
    watchClickParam(),
  ]);
}
