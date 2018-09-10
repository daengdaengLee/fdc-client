// Actions
export const PUSH = 'routes/PUSH';

// Init State
const initState = {
  location: 'main',
};

// Reducer
export default function routesReducer(state = initState, action = {}) {
  switch (action.type) {
  case PUSH:
    return applyPush(state, action);
  default:
    return state;
  }
}

// Action Creators
export function push({ location }) {
  return {
    type: PUSH,
    location,
  };
}

// Reducer Functions
function applyPush(state, { location }) {
  return {
    ...state,
    location,
  };
}
