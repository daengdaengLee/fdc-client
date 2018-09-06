import { getTimeString } from '../../../assets/js/utils';

const _dygraph = {};

export const _registerG = (id, g) => (_dygraph[id] = g);

export const _releaseG = id => delete _dygraph[id];

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
    if (
      isNaN(uclPoints[i].canvasy) ||
      isNaN(uclPoints[i + 1].canvasy) ||
      isNaN(lclPoints[i].canvasy) ||
      isNaN(lclPoints[i + 1].canvasy) ||
      isNaN(uslPoints[i].canvasy) ||
      isNaN(uslPoints[i + 1].canvasy) ||
      isNaN(lslPoints[i].canvasy) ||
      isNaN(lslPoints[i + 1].canvasy)
    )
      continue;
    // usl - ucl
    ctx.fillStyle = 'rgba(255, 99, 71, 0.3)';
    ctx.beginPath();
    ctx.moveTo(uclPoints[i].canvasx, uclPoints[i].canvasy);
    ctx.lineTo(uslPoints[i].canvasx, uslPoints[i].canvasy);
    ctx.lineTo(uslPoints[i + 1].canvasx, uslPoints[i + 1].canvasy);
    ctx.lineTo(uclPoints[i + 1].canvasx, uclPoints[i + 1].canvasy);
    ctx.fill();

    // ucl - lcl
    ctx.fillStyle = 'rgba(135, 206, 235, 0.3)';
    ctx.beginPath();
    ctx.moveTo(lclPoints[i].canvasx, lclPoints[i].canvasy);
    ctx.lineTo(uclPoints[i].canvasx, uclPoints[i].canvasy);
    ctx.lineTo(uclPoints[i + 1].canvasx, uclPoints[i + 1].canvasy);
    ctx.lineTo(lclPoints[i + 1].canvasx, lclPoints[i + 1].canvasy);
    ctx.fill();

    // lcl - lsl
    ctx.fillStyle = 'rgba(255, 99, 71, 0.3)';
    ctx.beginPath();
    ctx.moveTo(lslPoints[i].canvasx, lslPoints[i].canvasy);
    ctx.lineTo(lclPoints[i].canvasx, lclPoints[i].canvasy);
    ctx.lineTo(lclPoints[i + 1].canvasx, lclPoints[i + 1].canvasy);
    ctx.lineTo(lslPoints[i + 1].canvasx, lslPoints[i + 1].canvasy);
    ctx.fill();
  }
};

export const _generateTicks = (min, max, g) => {
  const withins = g.rawData_.filter(row => row[0] > min && row[0] < max);
  const len = withins.length;
  const delta = Math.floor(len / 5);
  const ticks = withins.filter((v, i) => i % delta === 0).map(v => {
    const timestring = getTimeString(v[0]);
    return {
      v: v[0],
      label: timestring,
    };
  });
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
          color: 'red',
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
      ctx.fillStyle = 'red';
      ctx.fill();
    }
  }
};

export const _updateLegend = (legend, x, y, label) => {
  if (label === undefined) return (legend.innerText = '');
  legend.innerText = `${label} (${x}, ${y})`;
};

export const _zoomReset = id => () => {
  const g = _dygraph[id];
  g.resetZoom();
  g.__zoomStack__ = [{ x: null, y: null }];
};

export const _onZoomCallback = (minX, maxX, yRanges, id) => {
  const g = _dygraph[id];
  g.__zoomStack__.push({ x: [minX, maxX], y: yRanges[0] });
};

export const _onClickCallback = (evt, x, points, id, legend) => {
  const g = _dygraph[id];
  const [xDomCor, yDomCor] = g.eventToDomCoords(evt);
  const [, yDataCor] = g.toDataCoords(xDomCor, yDomCor);
  const closestSeries = points.reduce((acc, cur) => {
    const { yval: accY } = acc;
    const { yval: curY } = cur;
    const accDelta = Math.abs(accY - yDataCor);
    const curDelta = Math.abs(curY - yDataCor);
    return accDelta < curDelta ? acc : cur;
  });
  const delta = Math.abs(closestSeries.yval - yDataCor);
  if (delta > 10) return _updateLegend(legend, undefined, undefined, undefined);
  _highlightSeries(g, closestSeries.name);
  _updateLegend(
    legend,
    closestSeries.xval,
    closestSeries.yval,
    closestSeries.name,
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
    return accDelta < curDelta ? acc : cur;
  });
  const delta = Math.abs(closestSeries.yval - yDataCor);
  delta <= 10 &&
    _drawHighlightPoint(g, closestSeries.canvasx, closestSeries.canvasy);
};

export const _onDrawCallback = (g, steps, slots) => {
  const labels = document.querySelectorAll(
    '.dygraph-axis-label.dygraph-axis-label-x',
  );
  labels.forEach(label => {
    const time = label.textContent;
    // const stepIdx =
    //   steps.findIndex(
    //     obj => new Date(obj.value).getTime() > new Date(time).getTime(),
    //   ) - 1;
    // const step = steps[stepIdx];
    // const slotIdx =
    //   slots.findIndex(
    //     obj => new Date(obj.value).getTime() > new Date(time).getTime(),
    //   ) - 1;
    // const slot = slots[slotIdx];
    const step = steps[time] || '';
    const slot = slots[time] || '';
    const container = label.parentElement;
    const stepEl = document.createElement('div');
    // stepEl.innerText = !step ? '' : step.label;
    stepEl.innerText = step;
    const slotEl = document.createElement('div');
    // slotEl.innerText = !slot ? '' : slot.label;
    slotEl.innerText = slot;
    container.appendChild(stepEl);
    container.appendChild(slotEl);
  });
};

export const _onDoubleClickInteraction = (evt, g, context) => {
  g.__zoomStack__.length > 1 && g.__zoomStack__.pop();
  const { x, y } = g.__zoomStack__[g.__zoomStack__.length - 1];
  g.updateOptions({ dateWindow: x, valueRange: y });
};

export const _onClickInteraction = (evt, g, context, legend) => {
  const { x, y, label } = _getCoord(g, evt);
  legend.innerText =
    x !== undefined && y !== undefined && label !== undefined
      ? `${label}(${x}, ${y})`
      : '';
};

export const _onMouseMoveInteraction = (evt, g, context) => {
  const { x, y, label } = _getCoord(g, evt);
  const [canvasx, canvasy] = g.toDomCoords(x, y);
  const ignores = g.getLabels().slice(3);
  !ignores.includes(label) &&
    !isNaN(canvasx) &&
    !isNaN(canvasy) &&
    _drawHighlightPoint(g, canvasx, canvasy);
};
