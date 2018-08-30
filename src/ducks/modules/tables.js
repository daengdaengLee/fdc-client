// Actions
export const PAGINATE_START = 'tables/PAGINATE_START';
export const PAGINATE_SUCCESS = 'tables/PAGINATE_SUCCESS';
export const PAGINATE_FAIL = 'tables/PAGINATE_FAIL';
export const SET_ROWS = 'tables/SET_ROWS';
export const SET_PAGE = 'tables/SET_PAGE';

// Init State
const initState = {
  isLoading: false,
  isError: false,
  rows: [],
  page: 0,
};

// Reducer
export default function tablesReducer(state = initState, action = {}) {
  switch (action.type) {
  case PAGINATE_START:
    return applyPaginateStart(state, action);
  case PAGINATE_SUCCESS:
    return applyPaginateSuccess(state, action);
  case PAGINATE_FAIL:
    return applyPaginateFail(state, action);
  case SET_ROWS:
    return applySetRows(state, action);
  case SET_PAGE:
    return applySetPage(state, action);
  default:
    return state;
  }
}

// Action Creators
export function paginateStart({ page }) {
  return {
    type: PAGINATE_START,
    page,
  };
}

export function paginateSuccess() {
  return {
    type: PAGINATE_SUCCESS,
  };
}

export function paginateFail() {
  return {
    type: PAGINATE_FAIL,
  };
}

export function setRows({ rows }) {
  return {
    type: SET_ROWS,
    rows,
  };
}

export function setPage({ page }) {
  return {
    type: SET_PAGE,
    page,
  };
}

// Reducer Functions
function applyPaginateStart(state) {
  return {
    ...state,
    isLoading: true,
    isError: false,
  };
}

function applyPaginateSuccess(state) {
  return {
    ...state,
    isLoading: false,
    isError: false,
  };
}

function applyPaginateFail(state) {
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

function applySetPage(state, { page }) {
  return {
    ...state,
    page,
  };
}
