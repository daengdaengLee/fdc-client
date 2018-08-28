import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
// import '../../../index.css';

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 10px;
  background-color: #372f40;
`;

const Title = styled.h1`
  font-size: 20px;
  line-height: 45px;
  font-family: 'Quicksand', sans-serif;
  color: white;
`;

class MainHeader extends Component {
  render() {
    return (
      <Container>
        <Title>FDC Chart</Title>
      </Container>
    );
  }
}

export default MainHeader;