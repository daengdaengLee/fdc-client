import { all, takeEvery, put } from 'redux-saga/effects';
import { CLICK_MENU, close } from '../modules/context-menus';
import { requestFetch as requestFetchHistories } from '../modules/histories';

// Workers
function* clickMenuSaga({ event, item, history }) {
  console.log(item);
  switch (item) {
  case 'MODULE_TREE/LOT_WAFER':
    yield put(
      requestFetchHistories({
        by: 'lot',
        fab: 'M14',
        mod: 'MODULE_1',
        from: '2018-08-31',
        to: '2018-09-01',
      }),
    );
    history.push('/histories');
    break;
  default:
  }
  yield put(close());
}

// Watchers
function* watchClickMenu() {
  yield takeEvery(CLICK_MENU, clickMenuSaga);
}

export default function* contextMenusSaga() {
  yield all([watchClickMenu()]);
}
