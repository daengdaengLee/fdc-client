import React, { Component } from 'react';
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

class TableFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
    this._onClickAddButton = this._onClickAddButton.bind(this);
    this._onClickSearchButton = this._onClickSearchButton.bind(this);
    this._onClickResetButton = this._onClickResetButton.bind(this);
    this._onChangeFilterValue = this._onChangeFilterValue.bind(this);
  }

  render() {
    const {
      _onClickAddButton,
      _onClickSearchButton,
      _onClickResetButton,
      _onChangeFilterValue,
    } = this;
    const { filters, width, maxHeight, x, y } = this.props;
    const { value } = this.state;
    return (
      <Container
        width={width}
        top={`${y}px`}
        left={`${x}px`}
        onClick={e => {
          e.stopPropagation();
          e.nativeEvent.stopImmediatePropagation();
        }}
      >
        <SearchArea>
          <Input
            placeholder="Input filter"
            value={value}
            onChange={_onChangeFilterValue}
          />
          <Button style={{ marginLeft: '8px' }} onClick={_onClickAddButton}>
            Add
          </Button>
        </SearchArea>
        <FilterListArea onScroll={e => e.stopPropagation()}>
          {filters.map(filter => (
            <div key={`${filter.col}_${filter.value}`}>{filter.value}</div>
          ))}
        </FilterListArea>
        <ButtonArea>
          <Button onClick={_onClickSearchButton}>Search</Button>
          <Button style={{ marginLeft: '8px' }} onClick={_onClickResetButton}>
            Reset
          </Button>
        </ButtonArea>
      </Container>
    );
  }

  _onClickAddButton(event) {
    event.stopPropagation();
    const { onClickAdd } = this.props;
    const { value } = this.state;
    onClickAdd(value);
    this.setState({ value: '' });
  }

  _onClickSearchButton(event) {
    event.stopPropagation();
    const { onClickSearch } = this.props;
  }

  _onClickResetButton(event) {
    event.stopPropagation();
    const { onClickReset } = this.props;
    onClickReset();
  }

  _onChangeFilterValue(event) {
    const {
      target: { value },
    } = event;
    this.setState({
      value,
    });
  }
}

export default TableFilter;
