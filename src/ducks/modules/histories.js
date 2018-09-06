// Actions
export const REQUEST_FETCH = 'histories/REQUEST_FETCH';
export const FETCH_START = 'histories/FETCH_START';
export const FETCH_SUCCESS = 'histories/FETCH_SUCCESS';
export const FETCH_FAIL = 'histories/FETCH_FAIL';
export const SET_ROWS = 'histories/SET_ROWS';
export const SET_SELECTED_ROW_KEYS = 'histories/SET_SELECTED_ROW_KEYS';
export const SELECT_BY = 'histories/SELECT_BY';
export const SET_BY = 'histories/SET_BY';

// Init State
const initState = {
  isLoading: false,
  isError: false,
  by: 'lot',
  rows: [],
  columns: [
    'EQP_ID',
    'LOT_CODE',
    'RECIPE_ID',
    'LOT_ID',
    'START_DTTS',
    'END_DTTS',
    'SAMPLE_COUNT',
    'WAFER_COUNT',
    'TRACE_FAULT_COUNT',
    'TRACE_WARNING_COUNT',
    'ALARM_COUNT',
    'LOT_TYPE_CD',
    'PRODUCT_ID',
    'OPERATION_ID',
    'OPERATION_NAME',
    'STATUS_CD',
    'DATA_QUALITY_INDEX',
    'PPID_ID',
    'BATCH_ID',
    'PORT_ID',
    'CASSETTE_SLOT',
  ].map(str => ({ title: str, dataIndex: str, key: str, width: '200px' })),
  selectedRowKeys: [],
};

// Reducer
export default function historiesReducer(state = initState, action = {}) {
  switch (action.type) {
  case FETCH_START:
    return applyFetchStart(state, action);
  case FETCH_SUCCESS:
    return applyFetchSuccess(state, action);
  case FETCH_FAIL:
    return applyFetchFail(state, action);
  case SET_ROWS:
    return applySetRows(state, action);
  case SET_SELECTED_ROW_KEYS:
    return applySetSelectedRowKeys(state, action);
  case SET_BY:
    return applySetBy(state, action);
  default:
    return state;
  }
}

// Action Creators
export function requestFetch({ by, fab, mod, from, to }) {
  return {
    type: REQUEST_FETCH,
    by,
    fab,
    mod,
    from,
    to,
  };
}

export function fetchStart({ by, fab, mod, from, to }) {
  return {
    type: FETCH_START,
    by,
    fab,
    mod,
    from,
    to,
  };
}

export function fetchSuccess() {
  return {
    type: FETCH_SUCCESS,
  };
}

export function fetchFail() {
  return {
    type: FETCH_FAIL,
  };
}

export function setRows({ rows }) {
  return {
    type: SET_ROWS,
    rows,
  };
}

export function setSelectedRowKeys({ keys }) {
  return {
    type: SET_SELECTED_ROW_KEYS,
    keys,
  };
}

export function selectBy({ by }) {
  return {
    type: SELECT_BY,
    by,
  };
}

export function setBy({ by }) {
  return {
    type: SET_BY,
    by,
  };
}

// Reducer Functions
function applyFetchStart(state) {
  return {
    ...state,
    isLoading: true,
    isError: false,
  };
}

function applyFetchSuccess(state) {
  return {
    ...state,
    isLoading: false,
    isError: false,
  };
}

function applyFetchFail(state) {
  return {
    ...state,
    isLoading: false,
    isError: true,
  };
}

function applySetRows(state, { rows }) {
  return {
    ...state,
    rows,
  };
}

function applySetSelectedRowKeys(state, { keys }) {
  return {
    ...state,
    selectedRowKeys: keys,
  };
}

function applySetBy(state, { by }) {
  return {
    ...state,
    by,
  };
}
