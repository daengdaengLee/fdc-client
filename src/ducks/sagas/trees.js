import { all, takeEvery, select, call, put } from 'redux-saga/effects';
import {
  REQUEST_FETCH,
  FETCH_START,
  fetchStart,
  fetchSuccess,
  fetchFail,
  setNodes,
} from '../modules/trees';
import { getTree } from '../../assets/js/requests';

// Helpers

// Workers
function* requestFetchSaga({ fab }) {
  const { isLoading } = yield select(state => state.trees);
  yield isLoading || put(fetchStart({ fab }));
}

function* fetchStartSaga({ fab }) {
  const { data, success } = yield call(getTree, fab);
  yield put(success ? fetchSuccess() : fetchFail());
  const dummyData = [
    
    // [{}, {}, {}, ...]

    { 
      fab: {
        name: 'M10',
        key: '0-0',
        child: [{
          area: { name: 'Assembly', key: '0-0-1' },
          sdpt: { name: 'HIC', key: '0-0-2' },
          eqp_model: { name: '7LAH', key: '0-0-3' },
          eqp_id: { name: '7LAH01', key: '0-0-4' },
          module_id: [
            { name: 'LCD1', key: '0-0-3-0' },
            { name: 'SHD1', key: '0-0-3-1' }, 
            { name: 'SLD2', key: '0-0-3-2' },
          ],
        }],
      }, 
    },
    {
      fab: {
        name: 'M14',
        key: '0-1',
        child: [{
          area: { name: 'Assembly', key: '0-1-1' },
          sdpt: { name: 'HIC', key: '0-1-2' },
          eqp_model: { name: '7LAH', key: '0-1-3' },
          eqp_id: { name: '7LAH01', key: '0-1-4' },
          module_id: [
            { name: 'LCD1', key: '0-1-4-0' },
            { name: 'SHD1', key: '0-1-4-1' }, 
            { name: 'SLD2', key: '0-1-4-2' },
          ],
        }],
      },
    },
  ];

  yield put(setNodes({ nodes: dummyData }));
}

// Watchers
function* watchRequestFetch() {
  yield takeEvery(REQUEST_FETCH, requestFetchSaga);
}

function* watchFetchStart() {
  yield takeEvery(FETCH_START, fetchStartSaga);
}

export default function* treesSaga() {
  yield all([watchRequestFetch(), watchFetchStart()]);
}
