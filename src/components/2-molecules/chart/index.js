import React, { Component } from 'react';
import styled from 'styled-components';
import Dygraph from 'dygraphs';
import { notification } from 'antd';
import { getTraceData } from '../../../assets/js/requests';

const _plotter = (lslLabel, lclLabel, uclLabel, uslLabel) => e => {
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

// const _getCoord = (g, evt) => {
//   const [xDomCor, yDomCor] = g.eventToDomCoords(evt);
//   const [xDataCor, yDataCor] = g.toDataCoords(xDomCor, yDomCor);
//   const key = Math.round(xDataCor);
//   const labels = g.getLabels();
//   const result = g.rawData_.reduce(
//     (acc, cur) => {
//       const curDeltaX = Math.abs(cur[0] - key);
//       if (acc.x === undefined) {
//         if (curDeltaX > 1 * 60 * 60 * 1000) return acc;
//         const { y: closestY, idx } = cur
//           .slice(1)
//           .reduce(
//             (acc, cur, idx) =>
//               Math.abs(acc.y - yDataCor) < Math.abs(cur - yDataCor)
//                 ? acc
//                 : { y: cur, idx },
//             { y: cur[1], idx: 0 },
//           );
//         if (Math.abs(closestY - yDataCor) > 10) return acc;
//         return { x: cur[0], y: closestY, label: labels[idx + 1] };
//       }
//       if (Math.abs(acc.x - key) <= curDeltaX) return acc;
//       const { y: closestY, idx } = cur
//         .slice(1)
//         .reduce(
//           (acc, cur, idx) =>
//             Math.abs(acc.y - yDataCor) < Math.abs(cur - yDataCor)
//               ? acc
//               : { y: cur, idx },
//           { y: cur[1], idx: 0 },
//         );
//       if (Math.abs(closestY - yDataCor) > 10)
//         return { x: undefined, y: undefined, label: undefined };
//       return {
//         x: cur[0],
//         y: closestY,
//         label: labels[idx + 1],
//       };
//     },
//     { x: undefined, y: undefined, label: undefined },
//   );
//   return result;
// };

const _highlightSeries = (g, label) => {
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

const _drawHighlightPoint = (g, x, y) => {
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

const _updateLegend = (legend, x, y, label) => {
  if (label === undefined) return (legend.innerText = '');
  legend.innerText = `${label} (${x}, ${y})`;
};

const _onZoomCallback = (minX, maxX, yRanges, g) =>
  g.__zoomStack__.push({ x: [minX, maxX], y: yRanges[0] });

const _onClickCallback = (evt, x, points, g, legend) => {
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

const _onHighlightCallback = (evt, x, points, row, seriesName, g) => {
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
  const labels = g.getLabels();
  const ignores = labels.slice(3);
  delta <= 10 &&
    !ignores.includes(closestSeries.name) &&
    _drawHighlightPoint(g, closestSeries.canvasx, closestSeries.canvasy);
};

const _onDoubleClickInteraction = (evt, g, context) => {
  g.__zoomStack__.length > 1 && g.__zoomStack__.pop();
  const { x, y } = g.__zoomStack__[g.__zoomStack__.length - 1];
  g.updateOptions({ dateWindow: x, valueRange: y });
};

// const _onClickInteraction = (evt, g, context, legend) => {
//   const { x, y, label } = _getCoord(g, evt);
//   legend.innerText =
//     x !== undefined && y !== undefined && label !== undefined
//       ? `${label}(${x}, ${y})`
//       : '';
// };

// const _onMouseMoveInteraction = (evt, g, context) => {
//   const { x, y, label } = _getCoord(g, evt);
//   const [canvasx, canvasy] = g.toDomCoords(x, y);
//   const ignores = g.getLabels().slice(3);
//   !ignores.includes(label) &&
//     !isNaN(canvasx) &&
//     !isNaN(canvasy) &&
//     _drawHighlightPoint(g, canvasx, canvasy);
// };

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ChartHeader = styled.div`
  height: 30px;
  display: flex;
`;

const Legend = styled.div`
  border: 1px solid black;
  box-sizing: border-box;
`;

const ChartContainer = styled.div`
  width: 100%;
  height: 0;
  flex-grow: 1;
`;

class Chart extends Component {
  constructor(props) {
    super(props);
    this.container = React.createRef();
    this.legend = React.createRef();
    this._validate = this._validate.bind(this);
    this._drawChart = this._drawChart.bind(this);
  }

  render() {
    const { container, legend, _validate } = this;
    const valid = _validate();
    return valid ? (
      <Container>
        <ChartHeader>
          <Legend innerRef={legend} />
        </ChartHeader>
        <ChartContainer innerRef={container} />
      </Container>
    ) : null;
  }

  componentDidMount() {
    this._validate() && this._drawChart();
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {
      fab: nextFab,
      mod: nextMod,
      from: nextFrom,
      to: nextTo,
      lot: nextLot,
      param: nextParam,
    } = nextProps;
    const {
      fab: prevFab,
      mod: prevMod,
      from: prevFrom,
      to: prevTo,
      lot: prevLot,
      param: prevParam,
    } = this.props;
    if (
      nextFab !== prevFab ||
      nextMod !== prevMod ||
      nextFrom !== prevFrom ||
      nextTo !== prevTo ||
      nextLot !== prevLot ||
      nextParam !== prevParam
    ) {
      return true;
    }
    return false;
  }

  componentDidUpdate() {
    this._validate() && this._drawChart();
  }

  _validate() {
    const { fab, mod, from, to, lot, param } = this.props;
    return !!fab && !!mod && !!from && !!to && !!lot && !!param;
  }

  _drawChart() {
    const { container, legend } = this;
    const { fab, mod, from, to, lot, param } = this.props;
    getTraceData(fab, mod, from, to, lot, param)
      .then(({ success, data }) => {
        if (!success) return Promise.reject({ message: 'Fetch failed' });
        if (!data.data) return Promise.reject({ message: 'No data' });
        const firstLfIdx = data.data.indexOf('\n');
        const labels = data.data
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
        const g = new Dygraph(container.current, data.data, {
          xRangePad: 2.4,
          drawPoints: false,
          highlightCircleSize: 0,
          highlightSeriesBackgroundAlpha: 1,
          legendFormatter: () => '',
          series: { ...series },
          interactionModel: {
            ...Dygraph.defaultInteractionModel,
            // click: (evt, g, context) =>
            //   _onClickInteraction(evt, g, context, legend.current),
            dblclick: _onDoubleClickInteraction,
            // mousemove: _onMouseMoveInteraction,
          },
          zoomCallback: (minX, maxX, yRanges) =>
            _onZoomCallback(minX, maxX, yRanges, g),
          clickCallback: (evt, x, points) =>
            _onClickCallback(evt, x, points, g, legend.current),
          highlightCallback: (evt, x, points, row, seriesName) =>
            _onHighlightCallback(evt, x, points, row, seriesName, g),
        });
        g.__zoomStack__ = [{ x: null, y: null }];
        g.__colorOrigin__ = { ...g.colorsMap_ };
        g.__seriesOrigin__ = series;
        window.g = g;
      })
      .catch(error =>
        notification.error({
          message: 'Failed to draw chart!',
          description: error.message,
          placement: 'bottomRight',
          style: {
            width: 660,
            marginLeft: -260,
          },
        }),
      );
  }
}

export default Chart;
