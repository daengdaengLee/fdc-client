// Actions
export const REQUEST_FETCH = 'parameters/REQUEST_FETCH';
export const FETCH_START = 'parameters/FETCH_START';
export const FETCH_SUCCESS = 'parameters/FETCH_SUCCESS';
export const FETCH_FAIL = 'parameters/FETCH_FAIL';
export const SET_PARAMS = 'parameters/SET_PARAMS';

// Init State
const initState = {
  isLoading: false,
  isError: false,
  params: [],
};

// Reducer
export default function parametersReducer(state = initState, action = {}) {
  switch (action.type) {
  case FETCH_START:
    return applyFetchStart(state, action);
  case FETCH_SUCCESS:
    return applyFetchSuccess(state, action);
  case FETCH_FAIL:
    return applyFetchFail(state, action);
  case SET_PARAMS:
    return applySetParams(state, action);
  default:
    return state;
  }
}

// Action Creators
export function requestFetch({ fab, eqp, from, to, lot }) {
  return {
    type: REQUEST_FETCH,
    fab,
    eqp,
    from,
    to,
    lot,
  };
}

export function fetchStart({ fab, eqp, from, to, lot }) {
  return {
    type: FETCH_START,
    fab,
    eqp,
    from,
    to,
    lot,
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

export function setParams({ params }) {
  return {
    type: SET_PARAMS,
    params,
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

function applySetParams(state, { params }) {
  return {
    ...state,
    params,
  };
}
