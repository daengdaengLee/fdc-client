import React from 'react';
import styled from 'styled-components';

const Default = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid black;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainNavigation = () => (
  <Default>
    Tree View
    <br />
    (MainNavigation component)
  </Default>
);

export default MainNavigation;
