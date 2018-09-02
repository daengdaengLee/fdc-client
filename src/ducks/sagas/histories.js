import { all, takeEvery, select, call, put } from 'redux-saga/effects';
import {
  REQUEST_FETCH,
  FETCH_START,
  fetchStart,
  fetchSuccess,
  fetchFail,
  setRows,
} from '../modules/histories';
import { getHistory } from '../../assets/js/requests';

// Helpers

// Workers
function* requestFetchSaga({ by, fab, eqp, from, to }) {
  const { isLoading } = yield select(state => state.histories);
  yield isLoading || put(fetchStart({ by, fab, eqp, from, to }));
}

function* fetchStartSaga({ by, fab, eqp, from, to }) {
  const { data, success } = yield call(getHistory, by, fab, eqp, from, to);
  yield put(success ? fetchSuccess() : fetchFail());
  const dummyData = [
    {
      key: '1',
      EQP_NAME: 'EAD303',
      CHAMBER: 'A',
      START_DT: '03.33.6',
      END_DT: '09.05.6',
      LOT_ID: 'TCH2184',
      SLOT_NO: '3',
      PRODUCT: '',
      OPER: 'R4073000A',
      RECIPE: 'CH_GBLHMPL_R7_A',
      PPID: 'CH_GBLHMPL_R7_ABCD',
      SAMPLE_CNT: '333',
    },
    {
      key: '2',
      EQP_NAME: 'EAD303',
      CHAMBER: 'A',
      START_DT: '04.14.4',
      END_DT: '09.38.4',
      LOT_ID: 'TCH2210',
      SLOT_NO: '10',
      PRODUCT: '',
      OPER: 'R4073000A',
      RECIPE: 'CH_GBLHMPL_R7_A',
      PPID: 'CH_GBLHMPL_R7_ABCD',
      SAMPLE_CNT: '325',
    },
    {
      key: '3',
      EQP_NAME: 'EAD303',
      CHAMBER: 'A',
      START_DT: '09:15.6',
      END_DT: '14:39.6',
      LOT_ID: 'TCH2184',
      SLOT_NO: '6',
      PRODUCT: '',
      OPER: 'R4073000A',
      RECIPE: 'CH_GBLHMPL_R7_A',
      PPID: 'CH_GBLHMPL_R7_ABCD',
      SAMPLE_CNT: '297',
    },
  ];
  yield put(setRows({ rows: dummyData }));
}

// Watchers
function* watchRequestFetch() {
  yield takeEvery(REQUEST_FETCH, requestFetchSaga);
}

function* watchFetchStart() {
  yield takeEvery(FETCH_START, fetchStartSaga);
}

export default function* historiesSaga() {
  yield all([watchRequestFetch(), watchFetchStart()]);
}
