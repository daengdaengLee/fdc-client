import Dygraph from 'dygraphs';
import store from '../../../ducks';
import {
  setChartSeries,
  setChartHighlights,
} from '../../../ducks/modules/charts';
import { getTimeString, greatestUnder } from '../../../assets/js/utils';
import '../../../index.css';
import legendNoti from '../legend';

const _dygraph = {};

export const _registerG = (id, g) => (_dygraph[id] = g);

export const _releaseG = id => {
  const {
    charts: { chartEl },
  } = store.getState();
  const container = chartEl[id];
  delete _dygraph[id];
  store.dispatch(setChartSeries({ id, series: undefined }));
  if (!container) return;
  container.current.childNodes.forEach(node => node.remove());
};

export const _getG = id => _dygraph[id];

export const _refreshG = id => {
  const g = _dygraph[id];
  const currentZoom = g.__zoomStack__[g.__zoomStack__.length - 1];
  g.updateOptions({ valueRange: currentZoom.y, dateWindow: currentZoom.x });
};

export const _toggleSeries = (id, seriesName, onOff) => {
  const g = _getG(id);
  const labels = g.getLabels();
  const idx = labels.findIndex(str => str === seriesName);
  g.setVisibility(idx - 1, onOff);
};

export const _addYPadding = g => {
  const yRange = g.yAxisExtremes()[0];
  const paddingRange = [yRange[0] - 5, yRange[1]];
  g.updateOptions({ valueRange: paddingRange });
  return paddingRange;
};

export const _plotter = (lslLabel, lclLabel, uclLabel, uslLabel) => e => {
  const ctx = e.drawingContext;
  const uclPoints = e.allSeriesPoints.find(
    series => series[0].name === uclLabel,
  );
  const lclPoints = e.allSeriesPoints.find(
    series => series[0].name === lclLabel,
  );
  const uslPoints = e.allSeriesPoints.find(
    series => series[0].name === uslLabel,
  );
  const lslPoints = e.allSeriesPoints.find(
    series => series[0].name === lslLabel,
  );
  const len = uclPoints.length - 1;
  for (let i = 0; i < len; i += 1) {
    // usl - lsl
    if (
      uslPoints[i] &&
      uslPoints[i + 1] &&
      lslPoints[i] &&
      lslPoints[i + 1] &&
      !isNaN(uslPoints[i].canvasy) &&
      !isNaN(uslPoints[i + 1].canvasy) &&
      !isNaN(lslPoints[i].canvasy) &&
      !isNaN(lslPoints[i + 1].canvasy)
    ) {
      // ctx.fillStyle = 'rgba(255, 99, 71, 0.3)';
      ctx.fillStyle = 'rgba(16, 212, 163, 0.3)';
      ctx.beginPath();
      ctx.moveTo(lslPoints[i].canvasx, lslPoints[i].canvasy);
      ctx.lineTo(uslPoints[i].canvasx, uslPoints[i].canvasy);
      ctx.lineTo(uslPoints[i + 1].canvasx, uslPoints[i + 1].canvasy);
      ctx.lineTo(lslPoints[i + 1].canvasx, lslPoints[i + 1].canvasy);
      ctx.fill();
    }
    // ucl - lcl
    if (
      uclPoints[i] &&
      uclPoints[i + 1] &&
      lclPoints[i] &&
      lclPoints[i + 1] &&
      !isNaN(uclPoints[i].canvasy) &&
      !isNaN(uclPoints[i + 1].canvasy) &&
      !isNaN(lclPoints[i].canvasy) &&
      !isNaN(lclPoints[i + 1].canvasy)
    ) {
      // ctx.fillStyle = 'rgba(4, 190, 214, 0.3)';
      ctx.fillStyle = 'rgba(244, 218, 46, 0.3)';
      ctx.beginPath();
      ctx.moveTo(lclPoints[i].canvasx, lclPoints[i].canvasy);
      ctx.lineTo(uclPoints[i].canvasx, uclPoints[i].canvasy);
      ctx.lineTo(uclPoints[i + 1].canvasx, uclPoints[i + 1].canvasy);
      ctx.lineTo(lclPoints[i + 1].canvasx, lclPoints[i + 1].canvasy);
      ctx.fill();
    }
  }
};

export const _generateTicks = (min, max, g, step, stepName, slot, id) => {
  const {
    charts: { tickLabels },
  } = store.getState();
  const selectedLabels = tickLabels
    .filter(obj => obj.selected)
    .map(obj => obj.key);
  // default timestamp ticks
  // If user unselect all tick labels
  if (selectedLabels.length === 0) {
    const delta = (max - min) / 6;
    const ticks = [];
    for (let i = 1; i <= 5; i += 1) {
      const timestamp = min + delta * i;
      const timestring = getTimeString(timestamp);
      ticks.push({ v: timestamp, label: timestring });
    }
    return ticks;
  }

  const tickHash = {};

  // STEP tick labels
  if (selectedLabels.includes('STEP')) {
    const withinRangeStep = step.filter(obj => {
      const timestamp = new Date(obj.value).getTime();
      return timestamp > min && timestamp < max;
    });
    const len = withinRangeStep.length;
    const delta = Math.ceil(len / 10);
    for (let i = 0; i < len; i += 1) {
      if (i % delta !== 0) continue;
      const cur = withinRangeStep[i];
      const time = new Date(cur.value).getTime();
      const timeTag = `<span>${cur.value}</span>`;
      const stepTag = `<span data-chart-tick="STEP_${id}">${cur.label}</span>`;
      tickHash[time] = { v: time, label: `${timeTag}<br />${stepTag}` };
    }
  }

  // STEP_NAME tick labels
  if (selectedLabels.includes('STEP_NAME')) {
    const withinRangeStepName = stepName.filter(obj => {
      const timestamp = new Date(obj.value).getTime();
      return timestamp > min && timestamp < max;
    });
    const len = withinRangeStepName.length;
    const delta = Math.ceil(len / 10);
    for (let i = 0; i < len; i += 1) {
      if (i % delta !== 0) continue;
      const cur = withinRangeStepName[i];
      const time = new Date(cur.value).getTime();
      const timeTag = `<span>${cur.value}</span>`;
      const stepNameTag = `<span data-chart-tick="STEP_NAME_${id}">${
        cur.label
      }</span>`;
      if (!tickHash[time]) {
        tickHash[time] = {
          v: time,
          label: `${timeTag}<br /><br />${stepNameTag}`,
        };
      } else {
        tickHash[time].label += `<br />${stepNameTag}`;
      }
    }
  }

  // SLOT tick labels
  if (selectedLabels.includes('SLOT')) {
    const withinRangeSlot = slot.filter(obj => {
      const timestamp = new Date(obj.value).getTime();
      return timestamp > min && timestamp < max;
    });
    const len = withinRangeSlot.length;
    const delta = Math.ceil(len / 10);
    for (let i = 0; i < len; i += 1) {
      if (i % delta !== 0) continue;
      const cur = withinRangeSlot[i];
      const time = new Date(cur.value).getTime();
      const timeTag = `<span>${cur.value}</span>`;
      const slotTag = `<span style="display: inline-block; padding: 0 5px; margin: 5px 0; font-size: 11px; min-width: 10px; background-color: #24ffc870; color: #535353;" data-chart-tick="SLOT_${id}">${
        cur.label
      }</span>`;
      if (!tickHash[time]) {
        tickHash[time] = {
          v: time,
          label: `${timeTag}<br /><br /><br />${slotTag}`,
        };
      } else if (tickHash[time].label.includes('data-chart-tick="STEP_NAME_')) {
        tickHash[time].label += `<br />${slotTag}`;
      } else {
        tickHash[time].label += `<br /><br />${slotTag}`;
      }
    }
  }

  const ticks = Object.values(tickHash);

  // Default timestamp ticks
  // If there is no ticks matched
  if (ticks.length === 0) {
    const delta = (max - min) / 6;
    for (let i = 1; i <= 5; i += 1) {
      const timestamp = min + delta * i;
      const timestring = getTimeString(timestamp);
      ticks.push({ v: timestamp, label: timestring });
    }
  }
  return ticks;
};

export const _getCoord = (g, evt) => {
  const [xDomCor, yDomCor] = g.eventToDomCoords(evt);
  const [xDataCor, yDataCor] = g.toDataCoords(xDomCor, yDomCor);
  const key = Math.round(xDataCor);
  const labels = g.getLabels();
  const result = g.rawData_.reduce(
    (acc, cur) => {
      const curDeltaX = Math.abs(cur[0] - key);
      if (acc.x === undefined) {
        if (curDeltaX > 1 * 60 * 60 * 1000) return acc;
        const { y: closestY, idx } = cur
          .slice(1)
          .reduce(
            (acc, cur, idx) =>
              Math.abs(acc.y - yDataCor) < Math.abs(cur - yDataCor)
                ? acc
                : { y: cur, idx },
            { y: cur[1], idx: 0 },
          );
        if (Math.abs(closestY - yDataCor) > 10) return acc;
        return { x: cur[0], y: closestY, label: labels[idx + 1] };
      }
      if (Math.abs(acc.x - key) <= curDeltaX) return acc;
      const { y: closestY, idx } = cur
        .slice(1)
        .reduce(
          (acc, cur, idx) =>
            Math.abs(acc.y - yDataCor) < Math.abs(cur - yDataCor)
              ? acc
              : { y: cur, idx },
          { y: cur[1], idx: 0 },
        );
      if (Math.abs(closestY - yDataCor) > 10)
        return { x: undefined, y: undefined, label: undefined };
      return {
        x: cur[0],
        y: closestY,
        label: labels[idx + 1],
      };
    },
    { x: undefined, y: undefined, label: undefined },
  );
  return result;
};

export const _highlightSeries = (g, label) => {
  const zoomBackupX = g.xAxisRange();
  const zoomBackupY = g.yAxisRange();
  const labels = g.getLabels();
  const seriesOpt = labels.reduce((acc, cur) => {
    if (cur === label) {
      return {
        ...acc,
        [cur]: {
          color: '#ed3421',
          strokeWidth: 2,
        },
      };
    }
    return {
      ...acc,
      [cur]: {
        color: g.__colorOrigin__[cur],
        strokeWidth: 1,
      },
    };
  }, {});
  g.updateOptions({
    series: { ...seriesOpt, ...g.__seriesOrigin__ },
    dateWindow: zoomBackupX,
    valueRange: zoomBackupY,
  });
};

export const _drawHighlightPoint = (g, x, y) => {
  const canvas = g.canvas_;
  const ctx = g.canvas_ctx_;
  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (x !== undefined && y !== undefined) {
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fillStyle = '#ed3421';
      ctx.fill();
    }
  }
};

export const _updateLegend = (legend, x, y, label) => {
  if (label === undefined) return (legend.innerText = '');
  const timestring = getTimeString(x);
  legend.innerText = `${label} (${timestring}, ${y})`;
};

export const _zoomReset = id => {
  legendNoti.destroy();
  const g = _dygraph[id];
  const initZoom = g.__zoomStack__[0];
  g.updateOptions({ dateWindow: initZoom.x, valueRange: initZoom.y });
  g.__zoomStack__ = [initZoom];
};

export const _onZoomCallback = (minX, maxX, yRanges, id) => {
  legendNoti.destroy();
  const g = _dygraph[id];
  g.__zoomStack__.push({ x: [minX, maxX], y: yRanges[0] });
};

export const _onClickCallback = (
  evt,
  x,
  points,
  id,
  param,
  lot,
  step,
  stepName,
  slot,
  recipe,
) => {
  legendNoti.destroy();
  const g = _dygraph[id];
  const [xDomCor, yDomCor] = g.eventToDomCoords(evt);
  const [, yDataCor] = g.toDataCoords(xDomCor, yDomCor);
  const closestSeries = points.reduce((acc, cur) => {
    const { yval: accY } = acc;
    const { yval: curY } = cur;
    const accDelta = Math.abs(accY - yDataCor);
    const curDelta = Math.abs(curY - yDataCor);
    if (isNaN(accDelta) && !isNaN(curDelta)) return cur;
    if (!isNaN(accDelta) && isNaN(curDelta)) return acc;
    return accDelta < curDelta ? acc : cur;
  });
  const delta = Math.abs(closestSeries.canvasy - yDomCor);
  if (delta > 10 || isNaN(delta)) {
    _highlightSeries(g, undefined);
    // _updateLegend(legend, undefined, undefined, undefined);
    return;
  }
  _highlightSeries(g, closestSeries.name);
  // _updateLegend(
  //   legend,
  //   closestSeries.xval,
  //   closestSeries.yval,
  //   closestSeries.name,
  // );

  const time = getTimeString(x);

  // step filter
  const getStepValue = greatestUnder(
    step,
    obj => new Date(obj.value).getTime(),
    time => time <= x,
  ) || { label: '' };
  const getStepName = greatestUnder(
    stepName,
    obj => new Date(obj.value).getTime(),
    time => time <= x,
  ) || { label: '' };
  const getSlot = greatestUnder(
    slot,
    obj => new Date(obj.value).getTime(),
    time => time <= x,
  ) || { label: '' };
  const getRecipe = greatestUnder(
    recipe,
    obj => new Date(obj.value).getTime(),
    time => time <= x,
  ) || { label: '' };

  const labels = g.getLabels().slice(1);
  const yvals = labels.map(label => {
    const point = points.find(obj => obj.name === label);
    return !point ? '' : point.yval;
  });

  legendNoti(
    time,
    yvals[0],
    yvals[1],
    yvals[2],
    yvals[3],
    yvals[4],
    yvals[5],
    getStepValue.label,
    getStepName.label,
    getSlot.label,
    getRecipe.label,
    param,
    lot,
  );
};

export const _onHighlightCallback = (evt, x, points, row, seriesName, id) => {
  const g = _dygraph[id];
  const [xDomCor, yDomCor] = g.eventToDomCoords(evt);
  const [, yDataCor] = g.toDataCoords(xDomCor, yDomCor);
  const closestSeries = points.reduce((acc, cur) => {
    const { yval: accY } = acc;
    const { yval: curY } = cur;
    const accDelta = Math.abs(accY - yDataCor);
    const curDelta = Math.abs(curY - yDataCor);
    if (isNaN(accDelta) && !isNaN(curDelta)) return cur;
    if (!isNaN(accDelta) && isNaN(curDelta)) return acc;
    return accDelta < curDelta ? acc : cur;
  });
  const delta = Math.abs(closestSeries.yval - yDataCor);
  delta <= 10 &&
    _drawHighlightPoint(g, closestSeries.canvasx, closestSeries.canvasy);
};

export const _onDoubleClickInteraction = (evt, g, context) => {
  g.__zoomStack__.length > 1 && g.__zoomStack__.pop();
  const { x, y } = g.__zoomStack__[g.__zoomStack__.length - 1];
  g.updateOptions({ dateWindow: x, valueRange: y });
};

// export const _onClickInteraction = (evt, g, context, legend) => {
//   const { x, y, label } = _getCoord(g, evt);
//   legend.innerText =
//     x !== undefined && y !== undefined && label !== undefined
//       ? `${label}(${x}, ${y})`
//       : '';
// };

// export const _onMouseMoveInteraction = (evt, g, context) => {
//   const { x, y, label } = _getCoord(g, evt);
//   const [canvasx, canvasy] = g.toDomCoords(x, y);
//   const ignores = g.getLabels().slice(3);
//   !ignores.includes(label) &&
//     !isNaN(canvasx) &&
//     !isNaN(canvasy) &&
//     _drawHighlightPoint(g, canvasx, canvasy);
// };

export const _drawChart = (container, data, id, param, lot, selectedLabels) => {
  console.time('render');
  const {
    data: _csv,
    slot: _slot,
    step: _step,
    step_name: _stepName,
    recipe: _recipe,
  } = data;
  const csv = !_csv ? 'X\n' : _csv;
  const slot = !_slot ? [] : _slot;
  const step = !_step ? [] : _step;
  const stepName = !_stepName ? [] : _stepName;
  const recipe = !_recipe ? [] : _recipe;
  const firstLfIdx = csv.indexOf('\n');
  const labels = csv
    .slice(0, firstLfIdx)
    .split(',')
    .map(label => label.trim());
  const lslLabel = labels[3];
  const lclLabel = labels[4];
  const uclLabel = labels[5];
  const uslLabel = labels[6];
  const series = {
    [uclLabel]: {
      strokeWidth: 0,
      plotter: _plotter(lslLabel, lclLabel, uclLabel, uslLabel),
      pointSize: 0,
      drawPoints: false,
    },
    [lclLabel]: {
      strokeWidth: 0,
      pointSize: 0,
      drawPoints: false,
    },
    [uslLabel]: {
      strokeWidth: 0,
      pointSize: 0,
      drawPoints: false,
    },
    [lslLabel]: {
      strokeWidth: 0,
      pointSize: 0,
      drawPoints: false,
    },
  };
  const axes = {
    x: {
      axisLabelWidth: 160,
      ticker: (min, max, pixels, opt, g) =>
        _generateTicks(min, max, g, step, stepName, slot, id),
    },
  };
  const g = new Dygraph(container.current, csv, {
    xRangePad: 20,
    drawPoints: false,
    highlightCircleSize: 0,
    highlightSeriesBackgroundAlpha: 1,
    axisLabelFontSize: 12,
    legendFormatter: () => '',
    axes,
    series: { ...series },
    interactionModel: {
      ...Dygraph.defaultInteractionModel,
      // click: (evt, g, context) =>
      //   _onClickInteraction(evt, g, context, legend.current),
      dblclick: _onDoubleClickInteraction,
      // mousemove: _onMouseMoveInteraction,
    },
    zoomCallback: (minX, maxX, yRanges) =>
      _onZoomCallback(minX, maxX, yRanges, id),
    clickCallback: (evt, x, points) =>
      _onClickCallback(
        evt,
        x,
        points,
        id,
        param,
        lot,
        step,
        stepName,
        slot,
        recipe,
      ),
    highlightCallback: (evt, x, points, row, seriesName) =>
      _onHighlightCallback(evt, x, points, row, seriesName, id),
  });
  const initYRange = _addYPadding(g);
  g.__zoomStack__ = [{ x: null, y: initYRange }];
  g.__colorOrigin__ = { ...g.colorsMap_ };
  g.__seriesOrigin__ = series;
  _registerG(id, g);
  const chartSeries = g
    .getLabels()
    .slice(1, 3)
    .map(str => ({
      key: str,
      display: str,
      selected: true,
      color: g.colorsMap_[str],
    }));
  store.dispatch(setChartSeries({ id, series: chartSeries }));
  store.dispatch(
    setChartHighlights({
      id,
      highlights: [
        {
          key: 'UNHIGHLIGHT_ALL',
          display: 'Unhighlight All',
          color: 'transparent',
        },
        ...chartSeries,
      ],
    }),
  );
  window.g = g;
  console.timeEnd('render');
};
