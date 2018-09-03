import React from 'react';
import styled from 'styled-components';
import { Button, Input } from 'antd';

const Container = styled.div.attrs({
  style: props => ({
    width: props.width,
    minWidth: props.width,
    top: props.top,
    left: props.left,
  }),
})`
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: 100;
  background-color: #ffffff;
`;

const SearchArea = styled.div`
  height: 50px;
  display: flex;
  padding: 10px;
  align-items: center;
  border-bottom: 1px solid gray;
  box-sizing: border-box;
`;

const FilterListArea = styled.div`
  max-height: 200px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  overflow-y: auto;
  overflow-x: hidden;
`;

const ButtonArea = styled.div`
  height: 50px;
  display: flex;
  padding: 10px;
  align-items: center;
  justify-content: flex-end;
  border-top: 1px solid gray;
  box-sizing: border-box;
`;

const TableFilter = ({
  value,
  filters,
  width,
  maxHeight,
  x,
  y,
  onClickAdd,
  onClickReset,
  onClickSearch,
  onChangeValue,
}) => (
  <Container width={width} top={`${y}px`} left={`${x}px`}>
    <SearchArea>
      <Input placeholder="Input filter" />
      <Button style={{ marginLeft: '8px' }}>Add</Button>
    </SearchArea>
    <FilterListArea>
      <div>hi</div>
      <div>hi</div>
      <div>hi</div>
      <div>hi</div>
      <div>hi</div>
      <div>hi</div>
      <div>hi</div>
      <div>hi</div>
      <div>hi</div>
      <div>hi</div>
      <div>hi</div>
      <div>hi</div>
      <div>hi</div>
      <div>hi</div>
      <div>hi</div>
      <div>hi</div>
      <div>hi</div>
      <div>hi</div>
      <div>hi</div>
      <div>hi</div>
      <div>hi</div>
      <div>hi</div>
      <div>hi</div>
      <div>hi</div>
      <div>hi</div>
      <div>hi</div>
      <div>hi</div>
      <div>hi</div>
      <div>hi</div>
      <div>hi</div>
      <div>hi</div>
      <div>hi</div>
      <div>hi</div>
      <div>hi</div>
    </FilterListArea>
    <ButtonArea>
      <Button>Search</Button>
      <Button style={{ marginLeft: '8px' }}>Reset</Button>
    </ButtonArea>
  </Container>
);

export default TableFilter;
