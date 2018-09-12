import React, { Component } from 'react';
import styled from 'styled-components';
import Dygraph from 'dygraphs';
import uuid from 'uuid/v1';
import { getTraceData } from '../../../assets/js/requests';
import { getDateString, notiError } from '../../../assets/js/utils';
import {
  _addYPadding,
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
  margin-bottom: 20px;
  margin-top: 10px;
  justify-content: space-between;
`;

const LeftSide = styled.div`
  padding-left: 20px;
  display: flex;
`;

const Title = styled.div`
  font-weight: 400;
  font-size: 18px;
  color: #666666;
  display: flex;
  align-items: center;
`;

const Legend = styled.div`
  font-size: 12px;
  margin-left: 10px;
  color: #09a9be;
  font-weight: 500;
  display: flex;
  align-items: center;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
`;
// margin-right: 30px;
// margin-top: 15px;
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
    const { param } = this.props;
    const { id } = this.state;
    const valid = _validate();
    return valid ? (
      <Container>
        <ChartHeader>
          <LeftSide>
            <Title>{param.PARAM_INFO}</Title>
            <Legend innerRef={legend} />
          </LeftSide>
          <IconContainer>
            <ZoomOutImg
              src={iconZoomOut}
              alt="zoom out"
              onClick={_zoomReset(id)}
              title="Zoom Out"
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
      param: nextParamObj,
    } = nextProps;
    const {
      fab: prevFab,
      mod: prevMod,
      from: prevFrom,
      to: prevTo,
      lot: prevLot,
      param: prevParamObj,
    } = this.props;
    const nextParam = nextParamObj && nextParamObj.PARAM_NAME;
    const prevParam = prevParamObj && prevParamObj.PARAM_NAME;
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
    return (
      !!fab &&
      !!mod &&
      !!from &&
      !!to &&
      !!lot &&
      !!param &&
      param.hasOwnProperty('PARAM_NAME')
    );
  }

  _drawChart() {
    const { container, legend } = this;
    const {
      fab,
      mod,
      from,
      to,
      lot,
      param: paramObj,
      selectedLabels,
      onFetchStart,
      onFetchSuccess,
      onFetchFail,
    } = this.props;
    const { id } = this.state;
    const param = paramObj.PARAM_NAME;
    container.current.childNodes.forEach(node => node.remove());
    legend.current.childNodes.forEach(node => node.remove());
    onFetchStart();
    console.time('fetch');
    getTraceData(fab, mod, from, to, lot, param)
      .then(({ success, data }) => {
        console.timeEnd('fetch');
        console.time('render');
        if (!success) return Promise.reject({ message: 'Fetch failed' });
        if (!data.data) return Promise.reject({ message: 'No data' });
        const { data: csv, slot, step, step_name: stepName, recipe } = data;
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
              _generateTicks(
                min,
                max,
                g,
                step,
                stepName,
                slot,
                selectedLabels,
                id,
              ),
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
              legend.current,
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
        window.g = g;
        onFetchSuccess();
        console.timeEnd('render');
      })
      .catch(error => {
        container.current.childNodes.forEach(node => node.remove());
        legend.current.childNodes.forEach(node => node.remove());
        notiError('Failed to draw chart!', error.message);
        onFetchFail();
      });
  }
}

export default Chart;
