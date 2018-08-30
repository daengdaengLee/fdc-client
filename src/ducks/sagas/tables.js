import { all, takeEvery, select, call, put } from 'redux-saga/effects';
import {
  PAGINATE_START,
  paginateFail,
  setPage,
  setRows,
  INIT_TABLE,
  paginateStart,
  paginateSuccess,
} from '../modules/tables';
import { getTables as getTablesRequest } from '../../assets/js/requests';

// Helpers
const getTables = page =>
  getTablesRequest(page)
    .then(res => res.data)
    .then(rows => ({ success: true, rows }))
    .catch(() => ({ success: false, rows: [] }));

const getAllTables = page =>
  Promise.all([page - 1, page, page + 1].map(v => getTablesRequest(v)))
    .then(resList => resList.map(res => res.data))
    .then(dataList => dataList.reduce((acc, cur) => [...acc, ...cur], []))
    .then(rows => ({ success: true, rows }))
    .catch(() => ({ success: false, rows: [] }));

// Workers
function* initTableSaga() {
  yield put(setPage({ page: 0 }));
  yield put(setRows({ rows: [] }));
  yield put(paginateStart({ page: 2 }));
}

function* paginateStartSaga({ page }) {
  const {
    page: currentPage,
    isError,
    rows: currentRows,
  } = yield select(state => state.tables);
  let success;
  let rows;
  if (currentPage === 0 || isError) {
    const result = yield call(getAllTables, page);
    ({ success, rows } = result);
  } else if (page > currentPage) {
    const result = yield call(getTables, page);
    ({ success } = result);
    rows = success
      ? [...currentRows.slice(result.rows.length), ...result.rows]
      : [];
  } else {
    const result = yield call(getTables, page);
    ({ success } = result);
    rows = success
      ? [...result.rows, ...currentRows.slice(0, result.rows.length * 2)]
      : [];
  }
  yield success ? put(paginateSuccess()) : put(paginateFail());
  yield put(setPage({ page }));
  yield put(setRows({ rows }));
}

// Watchers
function* watchInitTable() {
  yield takeEvery(INIT_TABLE, initTableSaga);
}

function* watchPaginateStart() {
  yield takeEvery(PAGINATE_START, paginateStartSaga);
}

export default function* tablesSaga() {
  yield all([watchInitTable(), watchPaginateStart()]);
}
