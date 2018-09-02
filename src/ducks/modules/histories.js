// Actions
export const REQUEST_FETCH = 'histories/REQUEST_FETCH';
export const FETCH_START = 'histories/FETCH_START';
export const FETCH_SUCCESS = 'histories/FETCH_SUCCESS';
export const FETCH_FAIL = 'histories/FETCH_FAIL';
export const SET_ROWS = 'histories/SET_ROWS';

// Init State
const initState = {
  isLoading: false,
  isError: false,
  rows: [],
  columns: [
    {
      title: 'Equipment Name',
      dataIndex: 'EQP_NAME',
      key: 'EQP_NAME',
      width: '200px',
    },
    {
      title: 'Chamber Name',
      dataIndex: 'CHAMBER',
      key: 'CHAMBER',
      width: '200px',
    },
    {
      title: 'Start Time',
      dataIndex: 'START_DT',
      key: 'START_DT',
      width: '200px',
    },
    {
      title: 'End Time',
      dataIndex: 'END_DT',
      key: 'END_DT',
      width: '200px',
    },
    {
      title: 'Lot ID',
      dataIndex: 'LOT_ID',
      key: 'LOT_ID',
      width: '200px',
    },
    {
      title: 'Slot No',
      dataIndex: 'SLOT_NO',
      key: 'SLOT_NO',
      width: '200px',
    },
    {
      title: 'Product',
      dataIndex: 'PRODUCT',
      key: 'PRODUCT',
      width: '200px',
    },
    {
      title: 'Operation',
      dataIndex: 'OPER',
      key: 'OPER',
      width: '200px',
    },
    {
      title: 'Recipe',
      dataIndex: 'RECIPE',
      key: 'RECIPE',
      width: '200px',
    },
    {
      title: 'PPID',
      dataIndex: 'PPID',
      key: 'PPID',
      width: '200px',
    },
    {
      title: 'Sample Count',
      dataIndex: 'SAMPLE_CNT',
      key: 'SAMPLE_CNT',
      width: '200px',
    },
  ],
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
  default:
    return state;
  }
}

// Action Creators
export function requestFetch({ by, fab, eqp, from, to }) {
  return {
    type: REQUEST_FETCH,
    by,
    fab,
    eqp,
    from,
    to,
  };
}

export function fetchStart({ by, fab, eqp, from, to }) {
  return {
    type: FETCH_START,
    by,
    fab,
    eqp,
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
