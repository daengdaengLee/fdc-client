import React, { Component } from 'react';
import styled from 'styled-components';
import { Menu, Dropdown, Button, Icon } from 'antd';
import HistoryTable from '../../2-molecules/history-table';
import '../../../index.css';

const Container = styled.div.attrs({
  style: props => ({ display: props.active ? null : 'none' }),
})`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: transparent;
`;

const HeaderContainer = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  margin-bottom: -15px;
  margin-top: 20px;
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
    this._generateViewTraceDataMenu = this._generateViewTraceDataMenu.bind(
      this,
    );
    this._onClickViewTraceDataMenu = this._onClickViewTraceDataMenu.bind(this);
  }

  render() {
    const {
      _onContextMenuTable,
      _onClickTable,
      _generateViewTraceDataMenu,
    } = this;
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
      location,
    } = this.props;
    return (
      <Container className="lot-wafer" active={location === 'histories'}>
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
          <Dropdown overlay={_generateViewTraceDataMenu()}>
            <Button 
              style={{ 
                width: '160px', 
                backgroundColor: '#f8f8f8', 
                borderRadius: '0', 
                fontSize: '12px',
                border: '0',
                // borderBottom: '1px solid #b4b4b4' 
              }}>
              View Trace Data<Icon type="down" />
            </Button>
          </Dropdown>
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

  _generateViewTraceDataMenu() {
    const { _onClickViewTraceDataMenu } = this;
    return (
      <Menu
        style={{ borderRadius: '0' }}
        onClick={_onClickViewTraceDataMenu}>
        <Menu.Item key="time" style={{ fontSize: '12px' }}>
          Time
        </Menu.Item>
        <Menu.Item disabled key="lot" style={{ fontSize: '12px' }}>
          Lot
        </Menu.Item>
        <Menu.Item disabled key="overlay" style={{ fontSize: '12px' }}>
          Overlay
        </Menu.Item>
      </Menu>
    );
  }

  _onClickViewTraceDataMenu({ key }) {
    const { onClickViewTraceDataTime } = this.props;
    switch (key) {
    case 'time':
      return onClickViewTraceDataTime();
    default:
      return;
    }
  }
}

export default MainHistoriesTable;
