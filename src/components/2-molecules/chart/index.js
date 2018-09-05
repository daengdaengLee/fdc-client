import React, { Component } from 'react';
import styled from 'styled-components';
import Dygraph from 'dygraphs';
import { notification } from 'antd';
import uuid from 'uuid/v1';
import { getTraceData } from '../../../assets/js/requests';
import {
  _registerG,
  _releaseG,
  _plotter,
  _zoomReset,
  _onZoomCallback,
  _onClickCallback,
  _onHighlightCallback,
  _onDoubleClickInteraction,
} from './helpers';

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
          <Legend innerRef={legend} />
          <button onClick={_zoomReset(id)}>Zoom Out</button>
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
    const { fab, mod, from, to, lot, param } = this.props;
    const { id } = this.state;
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
