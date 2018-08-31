import { all, takeEvery, put } from 'redux-saga/effects';
import { CLICK_MENU, close } from '../modules/context-menus';

// Workers
function* clickMenuSaga({ event, item }) {
  console.log(item);
  yield put(close());
}

// Watchers
function* watchClickMenu() {
  yield takeEvery(CLICK_MENU, clickMenuSaga);
}

export default function* contextMenusSaga() {
  yield all([watchClickMenu()]);
}
