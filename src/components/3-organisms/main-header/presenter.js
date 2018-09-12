import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #e2e5e8;
  border-bottom: 1px solid #f8f8f8;
  display: flex;
`;

const Link = styled.div`
  cursor: pointer;
  width: 180px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  font-size: 12px;
  background-color: ${props => (props.active ? '#2d2e30' : 'e2e5e8')};
  color: ${props => (props.active ? '#f8f8f8' : '#535353')};
`;

// border-top: ${props =>
//   props.active ? '3px solid #04bed6' : '3px solid #ffffff'};

const MainHeader = ({ location, onClickHistory, onClickTrace }) => (
  <Container>
    {location === 'main' ? null : (
      <Fragment>
        <Link onClick={onClickHistory} active={location === 'histories'}>
          Lot / Wafer History View
        </Link>
        <Link onClick={onClickTrace} active={location === 'charts'}>
          Trace Data View
        </Link>
      </Fragment>
    )}
  </Container>
);

MainHeader.propTypes = {
  location: PropTypes.string.isRequired,
  onClickHistory: PropTypes.func.isRequired,
  onClickTrace: PropTypes.func.isRequired,
};

export default MainHeader;
