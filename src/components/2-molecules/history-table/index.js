import React, { Component } from 'react';
import { Icon } from 'antd';
import styled from 'styled-components';
import { Table } from 'react-table-daeng';
import TableFilter from '../table-filter';

class ColCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterOnOff: false,
    };
    this._onClickFilter = this._onClickFilter.bind(this);
    this._onClickAddFilter = this._onClickAddFilter.bind(this);
    this._onClickResetFilters = this._onClickResetFilters.bind(this);
  }

  render() {
    const { _onClickFilter, _onClickAddFilter, _onClickResetFilters } = this;
    const { col, idx, filters, onContextMenu } = this.props;
    const { filterOnOff } = this.state;
    const colFilters = filters.filter(obj => obj.col === col.key);
    return (
      <div
        style={{
          width: col.width,
          minWidth: col.width,
          backgroundColor: '#f1f1f1',
          borderLeft: idx === 0 ? 'none' : '1px white solid',
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 16px 0 20px',
          fontWeight: '600',
          position: 'relative',
        }}
        onContextMenu={event => onContextMenu({ event, type: 'col', col })}
      >
        {col.title}
        <Icon
          type="filter"
          theme="outlined"
          style={{ cursor: 'pointer' }}
          onClick={_onClickFilter}
        />
        {filterOnOff ? (
          <TableFilter
            width="240px"
            x={160}
            y={40}
            filters={colFilters}
            onClickAdd={_onClickAddFilter}
            onClickReset={_onClickResetFilters}
          />
        ) : null}
      </div>
    );
  }

  _onClickFilter(event) {
    this.setState(prevState => ({
      ...prevState,
      filterOnOff: !prevState.filterOnOff,
    }));
  }

  _onClickAddFilter(value) {
    const { col, pushTableFilter } = this.props;
    pushTableFilter({ col: col.key, value });
  }

  _onClickResetFilters() {
    const { col, resetTableFilters } = this.props;
    resetTableFilters({ col: col.key });
  }
}

const RowContainer = styled.div`
  display: flex;
  height: 40px;
  min-height: 40px;
  background-color: ${props => (props.isSelected ? '#eefdff' : '#ffffff')}
  &:hover {
    background-color: #f8f8f8;
  }
`;

const Row = ({
  row,
  columns,
  selectedRows,
  idx: rowIdx,
  onContextMenu,
  onClick,
}) => (
  <RowContainer
    isSelected={selectedRows.includes(row.key)}
    onClick={event => onClick({ event, type: 'cell', row })}
  >
    {columns.map((col, colIdx) => {
      const label = row[col.dataIndex];
      return (
        <RowCell
          key={col.key}
          label={label === undefined ? '' : label}
          width={col.width}
          rowIdx={rowIdx}
          colIdx={colIdx}
          onContextMenu={event =>
            onContextMenu({ event, type: 'cell', row, col })
          }
        />
      );
    })}
  </RowContainer>
);

const RowCell = ({ label, width, rowIdx, colIdx, onContextMenu }) => {
  return (
    <div
      style={{
        width,
        minWidth: width,
        backgroundColor: 'transparent',
        borderTop: rowIdx === 0 ? 'none' : '1px #ebebeb solid',
        borderLeft: colIdx === 0 ? 'none' : '1px #ebebeb solid',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '20px',
        fontWeight: '400',
      }}
      onContextMenu={onContextMenu}
    >
      {label}
    </div>
  );
};

class HistoryTable extends Component {
  render() {
    const {
      columns: _columns,
      rows: _rows,
      selectedRows,
      filters,
      onContextMenu,
      onClick,
      pushTableFilter,
      popTableFilter,
      resetTableFilters,
    } = this.props;
    const columns = _columns.map((col, idx) => ({
      ...col,
      renderCell: col => (
        <ColCell
          key={col.key}
          col={col}
          idx={idx}
          filters={filters}
          onContextMenu={onContextMenu}
          pushTableFilter={pushTableFilter}
          popTableFilter={popTableFilter}
          resetTableFilters={resetTableFilters}
        />
      ),
    }));
    const rows = _rows.map((row, idx) => {
      row.renderRow = (row, columns, selectedRows) => (
        <Row
          key={row.key}
          row={row}
          columns={columns}
          selectedRows={selectedRows}
          idx={idx}
          onClick={onClick}
          onContextMenu={onContextMenu}
        />
      );
      return row;
    });
    return (
      <Table
        columns={columns}
        rows={rows}
        selectedRows={selectedRows}
        cellHeight="40px"
      />
    );
  }
}

export default HistoryTable;
