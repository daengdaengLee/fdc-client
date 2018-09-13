import { all, takeEvery, call, put, select } from 'redux-saga/effects';
import { getTraceData } from '../../assets/js/requests';
import { notiError } from '../../assets/js/utils';
import {
  TOGGLE_TICK_LABEL,
  FETCH_START,
  fetchFail,
  FETCH_FAIL,
  fetchSuccess,
  CLICK_ZOOM_RESET,
  TOGGLE_CHART_SERIES,
} from '../modules/charts';
import {
  _drawChart,
  _zoomReset,
  _toggleSeries,
} from '../../components/2-molecules/chart/helpers';
import legendNoti from '../../components/2-molecules/legend';

// Workers
function* fetchStartSaga({ fab, mod, from, to, lot, param, chartId }) {
  const { chartEl, tickLabels } = yield select(state => state.charts);
  const container = chartEl[chartId];
  const { success, data } = yield call(
    getTraceData,
    fab,
    mod,
    from,
    to,
    lot,
    param,
  );
  if (!success || !data || !data.data) {
    yield put(
      fetchFail({
        message: !success
          ? 'Failed to fetch'
          : !data || !data.data
            ? 'No data'
            : 'Uncaught error',
      }),
    );
    return;
  }
  try {
    yield call(
      _drawChart,
      container,
      data,
      chartId,
      param,
      lot,
      tickLabels.filter(obj => obj.selected).map(obj => obj.key),
    );
    yield put(fetchSuccess());
  } catch (error) {
    yield put(fetchFail({ message: error.message }));
  }
}

function* fetchFailSaga({ message }) {
  yield call(notiError, 'Failed to draw chart', message);
}

function* toggleTickLabelSaga({ id, label, onOff }) {
  const selector = `[data-chart-tick="${label}_${id}"]`;
  yield document.querySelectorAll(selector).forEach(tick => {
    tick.style.display = onOff ? 'inline' : 'none';
  });
}

function* toggleChartSeriesSaga({ id, series, onOff }) {
  yield legendNoti.destroy();
  yield _toggleSeries(id, series, onOff);
}

function* clickZoomResetSaga({ id }) {
  yield _zoomReset(id);
}

// Watchers
function* watchFetchStart() {
  yield takeEvery(FETCH_START, fetchStartSaga);
}

function* watchFetchFail() {
  yield takeEvery(FETCH_FAIL, fetchFailSaga);
}

function* watchToggleTickLabe() {
  yield takeEvery(TOGGLE_TICK_LABEL, toggleTickLabelSaga);
}

function* watchToggleChartSeries() {
  yield takeEvery(TOGGLE_CHART_SERIES, toggleChartSeriesSaga);
}

function* watchClickZoomReset() {
  yield takeEvery(CLICK_ZOOM_RESET, clickZoomResetSaga);
}

export default function* chartsSaga() {
  yield all([
    watchToggleChartSeries(),
    watchToggleTickLabe(),
    watchFetchStart(),
    watchFetchFail(),
    watchClickZoomReset(),
  ]);
}
