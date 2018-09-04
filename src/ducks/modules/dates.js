import { getTodayString, getYesterdayString } from '../../assets/js/utils';

// Actions
export const SELECT_FROM = 'dates/SELECT_FROM';
export const SELECT_TO = 'dates/SELECT_TO';
export const SET_FROM = 'dates/SET_FROM';
export const SET_TO = 'dates/SET_TO';

// Init State
const initState = {
  from: getYesterdayString(),
  to: getTodayString(),
};

// Reducer
export default function datesReducer(state = initState, action = {}) {
  switch (action.type) {
  case SET_FROM:
    return applySetFrom(state, action);
  case SET_TO:
    return applySetTo(state, action);
  default:
    return state;
  }
}

// Action Creators
export function selectFrom({ date }) {
  return {
    type: SELECT_FROM,
    date,
  };
}

export function selectTo({ date }) {
  return {
    type: SELECT_TO,
    date,
  };
}

export function setFrom({ date }) {
  return {
    type: SET_FROM,
    date,
  };
}

export function setTo({ date }) {
  return {
    type: SET_TO,
    date,
  };
}

// Reducer Functions
function applySetFrom(state, { date }) {
  return {
    ...state,
    from: date,
  };
}

function applySetTo(state, { date }) {
  return {
    ...state,
    to: date,
  };
}
