// Actions
export const OPEN = 'context-menus/OPEN';
export const CLOSE = 'context-menus/CLOSE';
export const CLICK_MENU = 'context-menus/CLICK_MENU';

// Init State
const initState = {
  onOff: false,
  x: 0,
  y: 0,
  theme: '',
  items: [],
};

// Reducer
export default function contextMenusReducer(state = initState, action = {}) {
  switch (action.type) {
  case OPEN:
    return applyOpen(state, action);
  case CLOSE:
    return applyClose(state, action);
  default:
    return state;
  }
}

// Action Creators
export function open({ x, y, theme }) {
  return {
    type: OPEN,
    x,
    y,
    theme,
  };
}

export function close() {
  return {
    type: CLOSE,
  };
}

export function clickMenu({ event, item }) {
  return {
    type: CLICK_MENU,
    event,
    item,
  };
}

// Reducer Functions
function applyOpen(state, { x, y, theme }) {
  return {
    ...state,
    x,
    y,
    theme,
  };
}

function applyClose(state) {
  return {
    ...initState,
  };
}
