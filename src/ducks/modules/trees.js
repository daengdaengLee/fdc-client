// Actions
export const REQUEST_FETCH = 'trees/REQUEST_FETCH';
export const FETCH_START = 'trees/FETCH_START';
export const FETCH_SUCCESS = 'trees/FETCH_SUCCESS';
export const FETCH_FAIL = 'trees/FETCH_FAIL';
export const SELECT_NODE = 'trees/SELECT_NODE';
export const SELECT_FAB = 'trees/SELECT_FAB';
// ----- server ------

export const SET_NODES = 'trees/SET_NODES';

// Init State
const initState = {
  isLoading: false,
  isError: false,
  selected: [],
  nodes: [],
  fab: '',
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
  case SELECT_NODE:
    return applySelectNode(state, action);
  case SELECT_FAB:
    return applySelectFab(state, action);
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

export function selectNode({ selectedNodes }) {
  return {
    type: SELECT_NODE,
    selectedNodes,
  };
}

export function selectFab({ fab }) {
  return {
    type: SELECT_FAB,
    fab,
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

function applySelectNode(state, { selectedNodes }) {
  return {
    ...state,
    selected: selectedNodes,
  };
}

function applySelectFab(state, { fab }) {
  return {
    ...state,
    fab, 
  };
}