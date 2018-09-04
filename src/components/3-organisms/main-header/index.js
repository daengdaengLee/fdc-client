import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
// import '../../../index.css';

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 10px;
  background-color: #fff;
  border-bottom: 1px solid #e3e3e3;
`;

const Title = styled.h1`
  font-family: 'Quicksand', sans-serif;
  line-height: 40px;
`;

class MainHeader extends Component {
  render() {
    return (
      <Container>
        <Title>top area</Title>
      </Container>
    );
  }
}

export default MainHeader;
