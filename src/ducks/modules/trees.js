// Actions
export const FETCH_START = 'trees/FETCH_START';
export const FETCH_SUCCESS = 'trees/FETCH_SUCCESS';
export const FETCH_FAIL = 'trees/FETCH_FAIL';
export const SET_NODES = 'trees/SET_NODES';
export const CLICK_NODE = 'trees/CLICK_NODE';
export const SET_SELECTED_NODES = 'trees/SET_SELECTED_NODE';
export const CLICK_FAB = 'trees/CLICK_FAB';
export const SET_FAB = 'trees/SET_FAB';

// Init State
const initState = {
  isLoading: false,
  isError: false,
  nodes: [],
  selected: [],
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
  case SET_SELECTED_NODES:
    return applySetSelectedNodes(state, action);
  case SET_FAB:
    return applySetFab(state, action);
  default:
    return state;
  }
}

// Action Creators
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

export function clickNode({ node }) {
  return {
    type: CLICK_NODE,
    node,
  };
}

export function setSelectedNodes({ nodes }) {
  return {
    type: SET_SELECTED_NODES,
    nodes,
  };
}

export function clickFab({ fab }) {
  return {
    type: CLICK_FAB,
    fab,
  };
}

export function setFab({ fab }) {
  return {
    type: SET_FAB,
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

function applySetSelectedNodes(state, { nodes }) {
  return {
    ...state,
    selected: nodes,
  };
}

function applySetFab(state, { fab }) {
  return {
    ...state,
    fab,
  };
}
