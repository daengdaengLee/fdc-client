import React, { Component } from 'react';
import styled from 'styled-components';
import Dygraph from 'dygraphs';
import { notification } from 'antd';
import { getTraceData } from '../../../assets/js/requests';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

class Chart extends Component {
  constructor(props) {
    super(props);
    this.container = React.createRef();
    this._validate = this._validate.bind(this);
    this._drawChart = this._drawChart.bind(this);
  }

  render() {
    const { container, _validate } = this;
    const valid = _validate();
    return valid ? <Container innerRef={container} /> : null;
  }

  componentDidMount() {
    this._validate() && this._drawChart();
  }

  componentDidUpdate() {
    this._validate() && this._drawChart();
  }

  _validate() {
    const { fab, mod, from, to, lot, param } = this.props;
    return !!fab && !!mod && !!from && !!to && !!lot && !!param;
  }

  _drawChart() {
    const { container } = this;
    const { fab, mod, from, to, lot, param } = this.props;
    getTraceData(fab, mod, from, to, lot, param)
      .then(({ success, data }) => {
        // if (!success) return Promise.reject({ message: 'Fetch failed' });
        // if (!data.data) return Promise.reject({ message: 'No data' });
        // const { csv } = data.data.split('\n').reduce(
        //   (acc, cur) => {
        //     const row = cur.split(',').map(str => str.trim());
        //     const x = row[0];
        //     const [slot] = row.splice(1, 1);
        //     const [step] = row.splice(1, 1);
        //     return {
        //       csv: [...acc, csv, row],
        //       step: {
        //         ...acc.step,
        //         [x]: step,
        //       },
        //       slot: {
        //         ...acc.slot,
        //         [x]: slot,
        //       },
        //     };
        //   },
        //   { csv: [], step: {}, slot: {} },
        // );
        // new Dygraph(container.current, csv);
        new Dygraph(container.current, data.data);
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
