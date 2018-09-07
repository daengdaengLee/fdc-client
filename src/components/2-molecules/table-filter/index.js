import React, { Component } from 'react';
import styled from 'styled-components';
import { Button, Input, Icon } from 'antd';

const Container = styled.div.attrs({
  style: props => ({
    width: props.width,
    minWidth: props.width,
    maxHeight: props.maxHeight && '300px',
    top: props.top,
    left: props.left,
  }),
})`
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: 100;
  background-color: #ffffff;

  border: 1px solid #d7d7d7;
`;

const SearchArea = styled.div`
  height: 50px;
  display: flex;
  padding: 10px;
  align-items: center;
  border-bottom: 1px solid #ededed;
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
  border-top: 1px solid #ededed;
  box-sizing: border-box;
`;

class TableFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
    this._onClickAddButton = this._onClickAddButton.bind(this);
    this._onClickResetButton = this._onClickResetButton.bind(this);
    this._onClickRemoveButton = this._onClickRemoveButton.bind(this);
    this._onChangeFilterValue = this._onChangeFilterValue.bind(this);
  }

  render() {
    const {
      _onClickAddButton,
      _onClickResetButton,
      _onClickRemoveButton,
      _onChangeFilterValue,
    } = this;
    const { filters, width, maxHeight, x, y } = this.props;
    const { value } = this.state;
    return (
      <Container
        className="filter"
        width={width}
        maxHeight={maxHeight}
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
            style={{
              borderRadius: '0',
              fontSize: '12px',
              borderColor: '#dedede',
            }}
          />
          <Button
            type="primary"
            style={{
              marginLeft: '5px',
              borderRadius: '0',
              // backgroundColor: '#da5e53'
            }}
            onClick={_onClickAddButton}
          >
            Add
          </Button>
        </SearchArea>
        <FilterListArea onScroll={e => e.stopPropagation()}>
          {filters.map(filter => (
            <div
              key={`${filter.col}_${filter.value}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '5px 4px',
                color: '#858585',
              }}
            >
              {filter.value}
              <Icon
                type="close-circle"
                theme="outlined"
                style={{ cursor: 'pointer', padding: '0' }}
                onClick={event => _onClickRemoveButton({ event, filter })}
              />
            </div>
          ))}
        </FilterListArea>
        <ButtonArea>
          <Button
            className="resetButton"
            style={{
              width: '55px',
              borderRadius: '0',
              fontSize: '12px',
            }}
            onClick={_onClickResetButton}
          >
            Reset
          </Button>
        </ButtonArea>
      </Container>
    );
  }

  componentDidMount() {
    document.addEventListener('click', this.props.onClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.props.onClickOutside);
  }

  _onClickAddButton(event) {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    const { onClickAdd } = this.props;
    const { value } = this.state;
    onClickAdd(value);
    this.setState({ value: '' });
  }

  _onClickResetButton(event) {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    const { onClickReset } = this.props;
    onClickReset();
  }

  _onClickRemoveButton({ event, filter }) {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    const { onClickRemove } = this.props;
    onClickRemove(filter);
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
