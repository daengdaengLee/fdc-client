import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  border-bottom: 1px solid #e3e3e3;
  display: flex;
`;

const Link = styled.div`
  cursor: pointer;
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border-top: ${props =>
    props.active ? '3px solid #04bed6' : '3px solid #ffffff'};
`;

class MainHeader extends Component {
  render() {
    const { location, onClickHistory, onClickTrace } = this.props;
    return (
      <Container>
        <Link onClick={onClickHistory} active={location === 'histories'}>
          Lot / Wafer History View
        </Link>
        <Link onClick={onClickTrace} active={location === 'charts'}>
          Trace Data View
        </Link>
      </Container>
    );
  }
}

MainHeader.propTypes = {
  location: PropTypes.string.isRequired,
  onClickHistory: PropTypes.func.isRequired,
  onClickTrace: PropTypes.func.isRequired,
};

export default MainHeader;
