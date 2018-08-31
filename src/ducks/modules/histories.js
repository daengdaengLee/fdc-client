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
  columns: [...Array(20)].map((v, i) => ({
    title: `Column ${i}`,
    dataIndex: `COL_${i}`,
    key: i,
    width: '200px',
  })),
};

// Reducer
export default function tablesReducer(state = initState, action = {}) {
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
