import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
`;

const Left = styled.div`
  width: 270px;
  min-width: 270px;
  overflow: hidden;
  background-color: #2d2e30;
`;

const Right = styled.div`
  width: 0;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: #e2e5e8;
`;

const Top = styled.div`
  height: 35px;
  min-height: 35px;
  overflow: hidden;
  padding: 0 20px;
  margin-top: 20px;
`;

const Center = styled.div`
  height: 0;
  flex-grow: 1;
  overflow: hidden;
`;

const MainTemplate = ({ top, left, center, aerial }) => (
  <Fragment>
    <Container>
      <Left>{left()}</Left>
      <Right>
        <Top>{top()}</Top>
        <Center>{center()}</Center>
      </Right>
    </Container>
    {aerial()}
  </Fragment>
);

const DefaultEl = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`;

MainTemplate.defaultProps = {
  top: () => <DefaultEl>No top element</DefaultEl>,
  left: () => <DefaultEl>No left element</DefaultEl>,
  center: () => <DefaultEl>No center element</DefaultEl>,
  aerial: () => null,
};

MainTemplate.propTypes = {
  top: PropTypes.func,
  left: PropTypes.func,
  center: PropTypes.func,
  aerial: PropTypes.func,
};

export default MainTemplate;
