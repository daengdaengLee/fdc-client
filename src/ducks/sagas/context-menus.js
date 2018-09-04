import { all, takeEvery, put, select } from 'redux-saga/effects';
import { CLICK_MENU, close } from '../modules/context-menus';
import { requestFetch as requestFetchHistories } from '../modules/histories';
import { requestFetch as requestFetchParameters } from '../modules/parameters';

// Workers
function* clickMenuSaga({ event, item, history }) {
  yield put(close());
  const {
    dates: { from, to },
    histories: { by },
  } = yield select(state => state);
  switch (item) {
  case 'MODULE_TREE/LOT_WAFER':
    yield put(
      requestFetchHistories({
        by,
        fab: 'M14',
        mod: 'MODULE_1',
        from,
        to,
      }),
    );
    history.push('/histories');
    break;
  case 'HISTORY_TABLE/TIME':
    const { selectedRowKeys, rows } = yield select(state => state.histories);
    const selectedRow = rows.find(row => row.key === selectedRowKeys[0]);
    yield put(
      requestFetchParameters({
        fab: 'M14',
        mod: 'MODULE_1',
        from,
        to,
        lot: selectedRow.LOT_ID,
      }),
    );
    history.push('/charts');
    break;
  default:
  }
}

// Watchers
function* watchClickMenu() {
  yield takeEvery(CLICK_MENU, clickMenuSaga);
}

export default function* contextMenusSaga() {
  yield all([watchClickMenu()]);
}
