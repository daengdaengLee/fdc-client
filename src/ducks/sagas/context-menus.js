import { all, takeEvery, put, select, call } from 'redux-saga/effects';
import { notiError } from '../../assets/js/utils';
import { push } from '../modules/routes';
import { CLICK_MENU, close } from '../modules/context-menus';
import { requestFetch as requestFetchHistories } from '../modules/histories';
import { requestFetch as requestFetchParameters } from '../modules/parameters';

// Helpers
function* validateDate({ from, to }) {
  if (!from || !to) {
    yield call(notiError, 'Date is mandatory field');
    return false;
  }
  return true;
}

function* validateModule({ mod }) {
  if (!mod) {
    yield call(notiError, 'Module is mandatory field');
    return false;
  }
  return true;
}

function* validateLot({ lot }) {
  if (!lot) {
    yield call(notiError, 'Lot is mandatory field');
    return false;
  }
  return true;
}

function* selectModuleTreeLotWafer({ by, fab, mod, from, to }) {
  const validDate = yield call(validateDate, { from, to });
  if (!validDate) return;
  const validMod = yield call(validateModule, { mod });
  if (!validMod) return;
  yield put(
    requestFetchHistories({
      by,
      fab,
      mod,
      from,
      to,
    }),
  );
  yield put(push({ location: 'histories' }));
}

function* selectHistoryTableTime({ fab, mod, from, to, lot }) {
  const validDate = yield call(validateDate, { from, to });
  if (!validDate) return;
  const validMod = yield call(validateModule, { mod });
  if (!validMod) return;
  const validLot = yield call(validateLot, { lot });
  if (!validLot) return;
  yield put(
    requestFetchParameters({
      fab,
      mod,
      from,
      to,
      lot,
    }),
  );
  yield put(push({ location: 'charts' }));
}

// Workers
function* clickMenuSaga({ item }) {
  yield put(close());
  const {
    dates: { from, to },
    histories: { by },
    trees: { selected: selectedMod, fab },
  } = yield select(state => state);
  const mod = selectedMod[0];
  switch (item) {
  case 'MODULE_TREE/LOT_WAFER':
    yield call(selectModuleTreeLotWafer, {
      by,
      fab,
      mod,
      from,
      to,
    });
    break;
  case 'HISTORY_TABLE/TIME':
    const { selectedRowKeys, rows } = yield select(state => state.histories);
    const selectedRow = rows.find(row => row.key === selectedRowKeys[0]);
    yield call(selectHistoryTableTime, {
      fab,
      mod,
      from,
      to,
      lot: selectedRow.LOT_ID,
    });
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
