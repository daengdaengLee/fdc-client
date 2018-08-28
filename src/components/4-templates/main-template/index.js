import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Top = styled.div`
  height: 2.8rem;
  overflow: hidden;
`;

const Below = styled.div`
  height: 0;
  flex-grow: 1;
  display: flex;
  overflow: hidden;
`;

const Left = styled.div`
  width: 16.8rem;
  overflow: hidden;
`;

const Center = styled.div`
  width: 0;
  flex-grow: 1;
  overflow: hidden;
`;

const MainTemplate = ({ top, left, center }) => (
  <Container>
    <Top>{top()}</Top>
    <Below>
      <Left>{left()}</Left>
      <Center>{center()}</Center>
    </Below>
  </Container>
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
};

MainTemplate.propTypes = {
  top: PropTypes.func,
  left: PropTypes.func,
  center: PropTypes.func,
};

export default MainTemplate;
