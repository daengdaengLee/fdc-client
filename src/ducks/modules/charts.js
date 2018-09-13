// Actions
export const FETCH_START = 'charts/FETCH_START';
export const FETCH_SUCCESS = 'charts/FETCH_SUCCESS';
export const FETCH_FAIL = 'charts/FETCH_FAIL';
export const SET_CHART_EL = 'charts/SET_CHART_EL';
export const TOGGLE_TICK_LABEL = 'charts/TOGGLE_TICK_LABEL';
export const CLICK_ZOOM_RESET = 'charts/CLICK_ZOOM_RESET';
export const SET_CHART_SERIES = 'charts/SET_CHART_SERIES';
export const TOGGLE_CHART_SERIES = 'charts/TOGGLE_CHART_SERIES';
export const SET_CHART_HIGHLIGHTS = 'charts/SET_CHART_HIGHLIGHTS';
export const TOGGLE_CHART_HIGHLIGHT = 'charts/TOGGLE_CHART_HIGHLIGHT';

// Init State
const initState = {
  isLoading: false,
  isError: false,
  chartEl: {},
  tickLabels: [
    {
      key: 'STEP',
      display: 'Step',
      selected: true,
    },
    {
      key: 'STEP_NAME',
      display: 'Step Name',
      selected: true,
    },
    {
      key: 'SLOT',
      display: 'Slot',
      selected: true,
    },
  ],
  chartSeries: {},
  chartHighlights: {},
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
  case SET_CHART_EL:
    return applySetChartEl(state, action);
  case TOGGLE_TICK_LABEL:
    return applyToggleTickLabel(state, action);
  case SET_CHART_SERIES:
    return applySetChartSeries(state, action);
  case TOGGLE_CHART_SERIES:
    return applyToggleChartSeries(state, action);
  case SET_CHART_HIGHLIGHTS:
    return applySetChartHighlights(state, action);
  default:
    return state;
  }
}

// Action Creators
export function fetchStart({ fab, mod, from, to, lot, param, chartId }) {
  return {
    type: FETCH_START,
    fab,
    mod,
    from,
    to,
    lot,
    param,
    chartId,
  };
}

export function fetchSuccess() {
  return {
    type: FETCH_SUCCESS,
  };
}

export function fetchFail({ message }) {
  return {
    type: FETCH_FAIL,
    message,
  };
}

export function setChartEl({ el, id }) {
  return {
    type: SET_CHART_EL,
    el,
    id,
  };
}

export function toggleTickLabel({ id, label, onOff }) {
  return {
    type: TOGGLE_TICK_LABEL,
    id,
    label,
    onOff,
  };
}

export function clickZoomReset({ id }) {
  return {
    type: CLICK_ZOOM_RESET,
    id,
  };
}

export function setChartSeries({ id, series }) {
  return {
    type: SET_CHART_SERIES,
    id,
    series,
  };
}

export function toggleChartSeries({ id, series, onOff }) {
  return {
    type: TOGGLE_CHART_SERIES,
    id,
    series,
    onOff,
  };
}

export function setChartHighlights({ id, highlights }) {
  return {
    type: SET_CHART_HIGHLIGHTS,
    id,
    highlights,
  };
}

export function toggleChartHighlight({ id, highlight }) {
  return {
    type: TOGGLE_CHART_HIGHLIGHT,
    id,
    highlight,
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

function applySetChartEl(state, { el, id }) {
  return { ...state, chartEl: { ...state.chartEl, [id]: el } };
}

function applyToggleTickLabel(state, { label, onOff }) {
  const idx = state.tickLabels.findIndex(obj => obj.key === label);
  if (idx === -1) return state;
  const target = state.tickLabels[idx];
  return {
    ...state,
    tickLabels: [
      ...state.tickLabels.slice(0, idx),
      { ...target, selected: onOff },
      ...state.tickLabels.slice(idx + 1),
    ],
  };
}

function applySetChartSeries(state, { id, series }) {
  return {
    ...state,
    chartSeries: {
      ...state.chartSeries,
      [id]: series,
    },
  };
}

function applyToggleChartSeries(state, { id, series, onOff }) {
  const current = state.chartSeries[id];
  if (!current) return state;
  const idx = current.findIndex(obj => obj.key === series);
  if (idx === -1) return state;
  const target = current[idx];
  return {
    ...state,
    chartSeries: {
      ...state.chartSeries,
      [id]: [
        ...current.slice(0, idx),
        { ...target, selected: onOff },
        ...current.slice(idx + 1),
      ],
    },
  };
}

function applySetChartHighlights(state, { id, highlights }) {
  return {
    ...state,
    chartHighlights: {
      ...state.chartHighlights,
      [id]: highlights,
    },
  };
}
