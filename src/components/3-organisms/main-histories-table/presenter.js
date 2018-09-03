import React, { Component } from 'react';
import styled from 'styled-components';
import { Icon } from 'antd';
import { Table } from 'react-table-daeng';
import TableFilter from '../../2-molecules/table-filter';

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: #f4f2f4;
`;

const TitleContainer = styled.div`
  height: 100px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 10px 10px 0 10px;
`;

const Title = styled.h2`
  font-size: 26px;
  font-family: 'Quicksand', sans-serif;
  font-weight: 500;
`;

const Location = styled.div`
  margin: 10px;
  padding: 5px 10px;
  background-color: #fff;
  border-radius: 3px;
`;

const TableArea = styled.div`
  height: 0;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  padding-left: 10px;
  background-color: #f4f2f4;
`;

const FilterContainer = styled.div`
  min-height: 80px;
  border: 1px solid indianred;
  background-color: #fff;
  margin-bottom: 10px;
`;

class FilterColCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterOnOff: false,
    };
    this._onClickFilter = this._onClickFilter.bind(this);
  }

  render() {
    const { _onClickFilter } = this;
    const { col } = this.props;
    const { filterOnOff } = this.state;
    return (
      <div
        style={{
          width: col.width,
          minWidth: col.width,
          backgroundColor: col.selected ? 'lightgray' : '#eae5ea',
          display: 'flex',
          alignItems: 'center',
          padding: '0 20px',
          position: 'relative',
        }}
      >
        {col.title || ''}
        <Icon
          type="filter"
          theme="outlined"
          style={{ cursor: 'pointer', marginLeft: '10px' }}
          onClick={_onClickFilter}
        />
        {filterOnOff ? <TableFilter width="240px" x={160} y={40} /> : null}
      </div>
    );
  }

  _onClickFilter() {
    this.setState(prevState => ({
      filterOnOff: !prevState.filterOnOff,
    }));
  }
}

class MainHistoriesTable extends Component {
  constructor(props) {
    super(props);
    this._onContextMenuRow = this._onContextMenuRow.bind(this);
  }

  render() {
    const { _onContextMenuRow } = this;
    const { rows, columns: _columns } = this.props;
    const columns = _columns.map(col => ({
      ...col,
      renderCell: col => <FilterColCell key={col.key} col={col} />,
    }));
    return (
      <Container>
        <TitleContainer>
          <Title>
            {/* <Icon type="table"/> */}
            Lot/Wafer
            <br />
            View
          </Title>
          <Location>
            <span style={{ marginRight: '10px', color: 'rgba(0, 0, 0, 0.85)' }}>
              <Icon type="table" />
              Table
            </span>
            /
            <span style={{ margin: '10px' }}>
              <Icon type="area-chart" />
              Chart
            </span>
            {/* 페이지 이동: table / chart */}
          </Location>
        </TitleContainer>
        <FilterContainer>
          <p>filter area</p>
        </FilterContainer>
        <TableArea>
          <Table
            columns={columns}
            rows={rows}
            onContextMenu={_onContextMenuRow}
          />
        </TableArea>
      </Container>
    );
  }

  _onContextMenuRow({ event, type, row, col }) {
    event.preventDefault();
    const { onOpenContextMenu } = this.props;
    const { clientX: x, clientY: y } = event;
    onOpenContextMenu({ x, y });
  }
}

export default MainHistoriesTable;
