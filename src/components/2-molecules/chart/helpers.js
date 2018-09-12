import { getTimeString } from '../../../assets/js/utils';
import '../../../index.css';
import legendNoti from '../legend';

const _dygraph = {};

export const _registerG = (id, g) => (_dygraph[id] = g);

export const _releaseG = id => delete _dygraph[id];

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
      ctx.fillStyle = 'rgba(255, 99, 71, 0.3)';
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
      ctx.fillStyle = 'rgba(4, 190, 214, 0.3)';
      ctx.beginPath();
      ctx.moveTo(lclPoints[i].canvasx, lclPoints[i].canvasy);
      ctx.lineTo(uclPoints[i].canvasx, uclPoints[i].canvasy);
      ctx.lineTo(uclPoints[i + 1].canvasx, uclPoints[i + 1].canvasy);
      ctx.lineTo(lclPoints[i + 1].canvasx, lclPoints[i + 1].canvasy);
      ctx.fill();
    }
  }
};

export const _generateTicks = (
  min,
  max,
  g,
  step,
  stepName,
  slot,
  selectedLabels,
  id,
) => {
  const stepTicks = step.reduce(
    (acc, cur) => ({
      ...acc,
      [new Date(cur.value).getTime()]: {
        timeTag: `<span>${cur.value}</span>`,
        stepTag: `<span style="${
          selectedLabels.includes('STEP') ? '' : 'display: none;'
        }" class="${id}-STEP">${cur.label}</span>`,
      },
    }),
    {},
  );
  const stepNameTicks = stepName.reduce((acc, cur) => {
    const unixdate = new Date(cur.value).getTime();
    const stepNameTag = `<span style="${
      selectedLabels.includes('STEP_NAME') ? '' : 'display: none;'
    }" class="${id}-STEP_NAME">${cur.label}</span>`;
    return !acc[unixdate]
      ? {
        ...acc,
        [unixdate]: { timeTag: `<span>${cur.value}</span>`, stepNameTag },
      }
      : {
        ...acc,
        [unixdate]: { ...acc[unixdate], stepNameTag },
      };
  }, stepTicks);
  const slotTicks = slot.reduce((acc, cur) => {
    const unixdate = new Date(cur.value).getTime();
    const slotTag = `<span style="display: inline-block; min-width: 10px; background-color: #04bed6; color: #f8f8f8; ${
      selectedLabels.includes('SLOT') ? '' : 'display: none;'
    }" class="${id}-SLOT">${cur.label}</span>`;
    return !acc[unixdate]
      ? {
        ...acc,
        [unixdate]: { timeTag: `<span>${cur.value}</span>`, slotTag },
      }
      : {
        ...acc,
        [unixdate]: { ...acc[unixdate], slotTag },
      };
  }, stepNameTicks);
  const ticks = Object.keys(slotTicks).map(v => {
    const tickObj = slotTicks[v];
    const { timeTag, stepTag, stepNameTag, slotTag } = tickObj;
    return {
      v: parseInt(v, 10),
      label: `${timeTag}<br />${!stepTag ? '' : stepTag}<br />${
        !stepNameTag ? '' : stepNameTag
      }<br />${!slotTag ? '' : slotTag}`,
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
  const timestring = getTimeString(x);
  legend.innerText = `${label} (${timestring}, ${y})`;
};

export const _zoomReset = id => () => {
  const g = _dygraph[id];
  const initZoom = g.__zoomStack__[0];
  g.updateOptions({ dateWindow: initZoom.x, valueRange: initZoom.y });
  g.__zoomStack__ = [initZoom];
};

export const _onZoomCallback = (minX, maxX, yRanges, id) => {
  const g = _dygraph[id];
  g.__zoomStack__.push({ x: [minX, maxX], y: yRanges[0] });
};

export const _onClickCallback = (
  evt,
  x,
  points,
  id,
  legend,
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
  const delta = Math.abs(closestSeries.yval - yDataCor);
  if (delta > 10 || isNaN(delta)) {
    _highlightSeries(g, undefined);
    _updateLegend(legend, undefined, undefined, undefined);
    return;
  }
  _highlightSeries(g, closestSeries.name);
  _updateLegend(
    legend,
    closestSeries.xval,
    closestSeries.yval,
    closestSeries.name,
  );

  const time = getTimeString(x);

  // step filter
  const getStepValue = step
    .filter(obj => new Date(obj.value).getTime() <= x)
    .reduce((acc, cur) => {
      const accX = new Date(acc.value).getTime();
      const curX = new Date(cur.value).getTime();
      return accX < curX ? cur : acc;
    });

  const getStepName = stepName
    .filter(obj => new Date(obj.value).getTime() <= x)
    .reduce((acc, cur) => {
      const accX = new Date(acc.value).getTime();
      const curX = new Date(cur.value).getTime();
      return accX < curX ? cur : acc;
    });

  const getSlot = slot
    .filter(obj => new Date(obj.value).getTime() <= x)
    .reduce((acc, cur) => {
      const accX = new Date(acc.value).getTime();
      const curX = new Date(cur.value).getTime();
      return accX < curX ? cur : acc;
    });

  legendNoti(
    time,
    points[0].yval,
    points[1].yval,
    points[2].yval,
    points[3].yval,
    points[4].yval,
    points[5].yval,
    getStepValue.label,
    getStepName.label,
    getSlot.label,
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
