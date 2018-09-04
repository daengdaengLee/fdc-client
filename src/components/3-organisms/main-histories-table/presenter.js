import React, { Component } from 'react';
import styled from 'styled-components';
import { Icon, Select } from 'antd';
import HistoryTable from '../../2-molecules/history-table';

const { Option } = Select;

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

class MainHistoriesTable extends Component {
  constructor(props) {
    super(props);
    this._onContextMenuRow = this._onContextMenuRow.bind(this);
  }

  render() {
    const { _onContextMenuRow } = this;
    const { rows, columns, by, onSelectBy } = this.props;
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
        <Select value={by} onSelect={onSelectBy} style={{ width: '200px' }}>
          <Option value="lot">Lot</Option>
          <Option value="wafer">Wafer</Option>
        </Select>
        <TableArea>
          <HistoryTable
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
    const { onOpenContextMenu, onSetSelectedRows } = this.props;
    const { clientX: x, clientY: y } = event;
    onOpenContextMenu({ x, y });
    onSetSelectedRows({ keys: [row.key] });
  }
}

export default MainHistoriesTable;
