import { getTimeString } from '../../../assets/js/utils';
import React from 'react';
import { notification, Icon } from 'antd';
import styled from 'styled-components';
import '../../../index.css';

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

export const _generateTicks = (min, max, g, step, stepName, slot) => {
  const stepTicks = step.reduce(
    (acc, cur) => ({
      ...acc,
      [new Date(cur.value).getTime()]: {
        timeTag: `<span>${cur.value}</span>`,
        stepTag: `<span>${cur.label}</span>`,
      },
    }),
    {},
  );
  const stepNameTicks = stepName.reduce((acc, cur) => {
    const unixdate = new Date(cur.value).getTime();
    const stepNameTag = `<span>${cur.label}</span>`;
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
    const slotTag = `<span style="display: inline-block; min-width: 10px; background-color: #04bed6; color: #f8f8f8;">${
      cur.label
    }</span>`;
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
) => {
  notification.destroy();
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
  _onOpenPointTooltip(
    time,
    points[0].yval,
    points[1].yval,
    points[2].yval,
    points[3].yval,
    points[4].yval,
    points[5].yval,
  );
};

const _onOpenPointTooltip = (time, value, target, lsl, lcl, ucl, usl) => {
  const Title = styled.h1`
    color: #f8f8f8;
    font-size: 13px;
  `;

  const ContentsLine = styled.div`
    display: flex;
    font-size: 12px;
    color: #f8f8f8;
  `;
  const InnerTitle = styled.span`
    display: inline-block;
    width: 86px;
    min-width: 86px;
    color: #f8f8f8;
  `;

  const Content = styled.span`
    display: inline-block;
    line-height: 20px;
    color: #f8f8f8;
    width: 80%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `;

  const ContentTitle = (
    <Title>
      <Icon type="info-circle" theme="filled" style={{ color: '#04bed6' }} />
      Information
    </Title>
  );

  const Contents = (
    <div>
      <ContentsLine>
        <InnerTitle>Lot</InnerTitle>
        <Content>texttexttexttexttexttexttexttex</Content>
      </ContentsLine>
      <ContentsLine>
        <InnerTitle>Slot</InnerTitle>
        <Content>text</Content>
      </ContentsLine>
      <ContentsLine>
        <InnerTitle>Substrate</InnerTitle>
        <Content>text</Content>
      </ContentsLine>
      <ContentsLine>
        <InnerTitle>Recipe</InnerTitle>
        <Content>text</Content>
      </ContentsLine>
      <ContentsLine>
        <InnerTitle>Step</InnerTitle>
        <Content>text</Content>
      </ContentsLine>
      <ContentsLine>
        <InnerTitle>Time</InnerTitle>
        <Content>{time}</Content>
      </ContentsLine>
      <ContentsLine>
        <InnerTitle>Parameter</InnerTitle>
        <Content>text</Content>
      </ContentsLine>
      <ContentsLine>
        <InnerTitle>Value</InnerTitle>
        <Content>{isNaN(value) ? '' : value}</Content>
      </ContentsLine>
      <ContentsLine>
        <InnerTitle>USL</InnerTitle>
        <Content>{isNaN(usl) ? '' : usl}</Content>
      </ContentsLine>
      <ContentsLine>
        <InnerTitle>UCL</InnerTitle>
        <Content>{isNaN(ucl) ? '' : ucl}</Content>
      </ContentsLine>
      <ContentsLine>
        <InnerTitle>LCL</InnerTitle>
        <Content>{isNaN(lcl) ? '' : lcl}</Content>
      </ContentsLine>
      <ContentsLine>
        <InnerTitle>LSL</InnerTitle>
        <Content>{isNaN(lsl) ? '' : lsl}</Content>
      </ContentsLine>
      <ContentsLine>
        <InnerTitle>Target</InnerTitle>
        <Content>{isNaN(target) ? '' : target}</Content>
      </ContentsLine>
    </div>
  );

  notification.open({
    message: ContentTitle,
    description: Contents,
    placement: 'bottomRight',
    bottom: 10,
    duration: null,
  });
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
