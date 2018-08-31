// Actions
export const REQUEST_FETCH = 'trees/REQUEST_FETCH';
export const FETCH_START = 'trees/FETCH_START'; 
export const FETCH_SUCCESS = 'trees/FETCH_SUCCESS';
export const FETCH_FAIL = 'trees/FETCH_FAIL';
// ----- server ------ 

export const SET_NODES = 'trees/SET_NODES';

// Init State
const initState = {
  isLoading: false,
  isError: false,
  nodes: [],
};

// Reducer
export default function treesReducer(state = initState, action = {}) {
  switch (action.type) {
  case FETCH_START:
    return applyFetchStart(state, action);
  case FETCH_SUCCESS:
    return applyFetchSuccess(state, action);
  case FETCH_FAIL:
    return applyFetchFail(state, action);
  case SET_NODES:
    return applySetNodes(state, action);
  default:
    return state;
  }
}

// Action Creators
export function requestFetch({ fab }) {
  return {
    type: REQUEST_FETCH,
    fab,
  };
}

export function fetchStart({ fab }) {
  return {
    type: FETCH_START,
    fab,
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

export function setNodes({ nodes }) {
  return {
    type: SET_NODES,
    nodes,
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

function applySetNodes(state, { nodes }) {
  return {
    ...state,
    nodes,
  };
}
