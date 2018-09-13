// Actions
export const REQUEST_FETCH = 'parameters/REQUEST_FETCH';
export const FETCH_START = 'parameters/FETCH_START';
export const FETCH_SUCCESS = 'parameters/FETCH_SUCCESS';
export const FETCH_FAIL = 'parameters/FETCH_FAIL';
export const SET_PARAMS = 'parameters/SET_PARAMS';
export const CLICK_PARAM = 'parameters/CLICK_PARAM';
export const SET_SELECTED = 'parameters/SET_SELECTED';

// Init State
const initState = {
  isLoading: false,
  isError: false,
  params: [],
  selected: [],
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
  case SET_SELECTED:
    return applySetSelected(state, action);
  default:
    return state;
  }
}

// Action Creators
export function requestFetch({ fab, mod, from, to, lot }) {
  return {
    type: REQUEST_FETCH,
    fab,
    mod,
    from,
    to,
    lot,
  };
}

export function fetchStart({ fab, mod, from, to, lot }) {
  return {
    type: FETCH_START,
    fab,
    mod,
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

export function clickParam({ param }) {
  return {
    type: CLICK_PARAM,
    param,
  };
}

export function setSelected({ selected }) {
  return {
    type: SET_SELECTED,
    selected,
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

function applySetSelected(state, { selected }) {
  return {
    ...state,
    selected,
  };
}
