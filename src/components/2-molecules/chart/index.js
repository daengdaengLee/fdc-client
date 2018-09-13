import React, { Component } from 'react';
import styled from 'styled-components';
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
  margin-top: 15px;
  justify-content: space-between;
`;

const LeftSide = styled.div`
  padding-left: 20px;
  display: flex;
`;

const Title = styled.div`
  font-weight: 400;
  font-size: 14px;
  margin-left: 17px;
  color: #666666;
  display: flex;
  align-items: center;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 40px;
`;

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
  margin-bottom: 50px;
`;

class Chart extends Component {
  constructor(props) {
    super(props);
    this.container = React.createRef();
  }

  render() {
    const { container } = this;
    const { param, id, onZoomReset } = this.props;
    return (
      <Container>
        <ChartHeader>
          <LeftSide>
            <Title>{param}</Title>
          </LeftSide>
          <IconContainer>
            <ZoomOutImg
              src={iconZoomOut}
              alt="zoom out"
              onClick={() => onZoomReset(id)}
              title="Zoom Out"
            />
          </IconContainer>
        </ChartHeader>
        <ChartContainer innerRef={container} />
      </Container>
    );
  }

  componentDidMount() {
    const { container } = this;
    const { onSetChartEl, id } = this.props;
    onSetChartEl(id, container);
  }

  componentDidUpdate() {
    const { container } = this;
    const { onSetChartEl, id } = this.props;
    onSetChartEl(id, container);
  }

  componentWillUnmount() {
    const { onSetChartEl, id } = this.props;
    onSetChartEl(id, null);
  }
}

export default Chart;
