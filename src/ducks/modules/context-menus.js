// Actions
export const OPEN = 'context-menus/OPEN';
export const CLOSE = 'context-menus/CLOSE';
export const CLICK_MENU = 'context-menus/CLICK_MENU';

// Init State
const initState = {
  onOff: false,
  x: 0,
  y: 0,
  theme: '', // HISTORY_TABLE, MODULE_TREE
  selected: [],
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
export function open({ x, y, theme, selected }) {
  return {
    type: OPEN,
    x,
    y,
    theme,
    selected,
  };
}

export function close() {
  return {
    type: CLOSE,
  };
}

export function clickMenu({ event, item, history }) {
  return {
    type: CLICK_MENU,
    event,
    item,
    history,
  };
}

// Reducer Functions
function applyOpen(state, { x, y, theme, selected }) {
  return {
    ...state,
    onOff: true,
    x,
    y,
    theme,
    selected,
  };
}

function applyClose(state) {
  return {
    ...initState,
  };
}
