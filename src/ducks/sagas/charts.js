import { all, takeEvery } from 'redux-saga/effects';
import { TOGGLE_TICK_LABEL } from '../modules/charts';

// Workers
function* toggleTickLabelSaga({ id, label, onOff }) {
  const selector = `.${id}-${label}`;
  yield document.querySelectorAll(selector).forEach(tick => {
    tick.style.display = onOff ? 'inline' : 'none';
  });
}

// Watchers
function* watchToggleTickLabe() {
  yield takeEvery(TOGGLE_TICK_LABEL, toggleTickLabelSaga);
}

export default function* chartsSaga() {
  yield all([watchToggleTickLabe()]);
}
