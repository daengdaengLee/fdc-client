import React, { Component } from 'react';
import styled from 'styled-components';
import Dygraph from 'dygraphs';
import uuid from 'uuid/v1';
import { getTraceData } from '../../../assets/js/requests';
import { getDateString, notiError } from '../../../assets/js/utils';
import {
  _registerG,
  _releaseG,
  _plotter,
  _zoomReset,
  _generateTicks,
  _onZoomCallback,
  _onClickCallback,
  _onHighlightCallback,
  _onDoubleClickInteraction,
} from './helpers';

import iconZoomOut from '../../../assets/img/ic-zoom-out.png';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 30px;
  background-color: #fff;
`;

const ChartHeader = styled.div`
  height: 30px;
  display: flex;
  font-size: 13px;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const LegendContainer = styled.div`
  display: flex;
  padding: 10px 20px;
`;

const Legend = styled.div`
  font-size: 12px;
  margin-left: 10px;
  color: #09a9be;
  font-weight: 500;
`;

const IconContainer = styled.div`
  margin-right: 30px;
  margin-top: 15px;
`;
// height: 25px;
//   width: 25px;

const ZoomOutImg = styled.img`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

const ChartContainer = styled.div`
  width: clac(100% - 80px);
  height: 0;
  flex-grow: 1;
  margin-right: 20px;
  margin-top: 10px;
  margin-bottom: 30px;
`;

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: uuid(),
    };
    this.container = React.createRef();
    this.legend = React.createRef();
    this._validate = this._validate.bind(this);
    this._drawChart = this._drawChart.bind(this);
  }

  render() {
    const { container, legend, _validate } = this;
    const { id } = this.state;
    const valid = _validate();
    return valid ? (
      <Container>
        <ChartHeader>
          <LegendContainer>
            <div>Legend: </div>
            <Legend innerRef={legend} />
          </LegendContainer>

          <IconContainer>
            <ZoomOutImg
              src={iconZoomOut}
              alt="zoom out"
              onClick={_zoomReset(id)}
            />
          </IconContainer>
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

  componentWillUnmount() {
    const { id } = this.state;
    _releaseG(id);
  }

  _validate() {
    const { fab, mod, from, to, lot, param } = this.props;
    return !!fab && !!mod && !!from && !!to && !!lot && !!param;
  }

  _drawChart() {
    const { container, legend } = this;
    const {
      fab,
      mod,
      from,
      to,
      lot,
      param,
      onFetchStart,
      onFetchSuccess,
      onFetchFail,
    } = this.props;
    const { id } = this.state;
    container.current.childNodes.forEach(node => node.remove());
    onFetchStart();
    console.time('fetch');
    getTraceData(fab, mod, from, to, lot, param)
      .then(({ success, data }) => {
        console.timeEnd('fetch');
        console.time('render');
        if (!success) return Promise.reject({ message: 'Fetch failed' });
        if (!data.data) return Promise.reject({ message: 'No data' });
        const { data: csv, slot, step } = data;
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
            axisLabelFormatter: getDateString,
            ticker: (min, max, pixels, opt, g) =>
              _generateTicks(min, max, g, step, slot),
          },
        };
        const g = new Dygraph(container.current, csv, {
          xRangePad: 2.4,
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
            _onClickCallback(evt, x, points, id, legend.current),
          highlightCallback: (evt, x, points, row, seriesName) =>
            _onHighlightCallback(evt, x, points, row, seriesName, id),
        });
        g.__zoomStack__ = [{ x: null, y: null }];
        g.__colorOrigin__ = { ...g.colorsMap_ };
        g.__seriesOrigin__ = series;
        _registerG(id, g);
        window.g = g;
        onFetchSuccess();
        console.timeEnd('render');
      })
      .catch(error => {
        container.current.childNodes.forEach(node => node.remove());
        notiError('Failed to draw chart!', error.message);
        onFetchFail();
      });
  }
}

export default Chart;
