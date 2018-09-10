// Actions
export const FETCH_START = 'charts/FETCH_START';
export const FETCH_SUCCESS = 'charts/FETCH_SUCCESS';
export const FETCH_FAIL = 'charts/FETCH_FAIL';

// Init State
const initState = {
  isLoading: false,
  isError: false,
};

// Reducer
export default function chartsReducer(state = initState, action = {}) {
  switch (action.type) {
  case FETCH_START:
    return applyFetchStart(state, action);
  case FETCH_SUCCESS:
    return applyFetchSuccess(state, action);
  case FETCH_FAIL:
    return applyFetchFail(state, action);
  default:
    return state;
  }
}

// Action Creators
export function fetchStart() {
  return {
    type: FETCH_START,
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

// Reducer Functions
function applyFetchStart(state) {
  return { ...state, isLoading: true, isError: false };
}

function applyFetchSuccess(state) {
  return { ...state, isLoading: false, isError: false };
}

function applyFetchFail(state) {
  return { ...state, isLoading: false, isError: true };
}
