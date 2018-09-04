import React, { Component } from 'react';
import styled from 'styled-components';
import Dygraph from 'dygraphs';
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
    getTraceData(fab, mod, from, to, lot, param).then(
      ({ success, data }) =>
        success && new Dygraph(container.current, data.data),
    );
  }
}

export default Chart;
