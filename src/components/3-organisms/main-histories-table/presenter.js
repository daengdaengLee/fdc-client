import React, { Component } from 'react';
import styled from 'styled-components';
import { Menu } from 'antd';
import HistoryTable from '../../2-molecules/history-table';
import '../../../index.css';

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: #f8f8f8;
`;

const HeaderContainer = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  margin-bottom: -15px;
`;

const TableArea = styled.div`
  height: 0;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  padding: 20px;
`;

class MainHistoriesTable extends Component {
  constructor(props) {
    super(props);
    this._onClickTable = this._onClickTable.bind(this);
    this._onContextMenuTable = this._onContextMenuTable.bind(this);
  }

  render() {
    const { _onContextMenuTable, _onClickTable } = this;
    const {
      rows,
      columns,
      by,
      selectedRows,
      tableFilters,
      onSelectBy,
      pushTableFilter,
      popTableFilter,
      resetTableFilters,
    } = this.props;
    return (
      <Container className="lot-wafer">
        <HeaderContainer>
          <Menu
            onClick={({ key }) => onSelectBy(key)}
            selectedKeys={[by]}
            mode="horizontal"
            style={{ backgroundColor: 'transparent', fontSize: '12px' }}
          >
            <Menu.Item
              key="lot"
              style={{
                width: '140px',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              Lot
            </Menu.Item>
            <Menu.Item
              key="wafer"
              style={{
                width: '140px',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              Wafer
            </Menu.Item>
          </Menu>
        </HeaderContainer>
        <TableArea>
          <HistoryTable
            columns={columns}
            rows={rows}
            onClick={_onClickTable}
            onContextMenu={_onContextMenuTable}
            selectedRows={selectedRows}
            filters={tableFilters}
            pushTableFilter={pushTableFilter}
            popTableFilter={popTableFilter}
            resetTableFilters={resetTableFilters}
          />
        </TableArea>
      </Container>
    );
  }

  _onClickTable({ event, type, row }) {
    if (type !== 'cell') return;
    const { onSetSelectedRows } = this.props;
    onSetSelectedRows({ keys: [row.key] });
  }

  _onContextMenuTable({ event, type, row, col }) {
    event.preventDefault();
    if (type !== 'cell') return;
    const { onOpenContextMenu, onSetSelectedRows } = this.props;
    const { clientX: x, clientY: y } = event;
    onOpenContextMenu({ x, y });
    onSetSelectedRows({ keys: [row.key] });
  }
}

export default MainHistoriesTable;
