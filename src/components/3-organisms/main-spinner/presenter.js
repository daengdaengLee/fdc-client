import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Spin } from 'antd';

const Container = styled.div`
  position: absolute;
  z-index: 999999;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.4);
`;

const MainSpinner = ({ isLoading }) =>
  isLoading ? (
    <Container>
      <Spin tip="Loading" size="large" />
    </Container>
  ) : null;

MainSpinner.defaultProps = {
  isLoading: false,
};

MainSpinner.propTypes = {
  isLoading: PropTypes.bool,
};

export default MainSpinner;
