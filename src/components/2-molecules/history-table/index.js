import React, { Component } from 'react';
import { Icon } from 'antd';
import styled from 'styled-components';
import { Table } from 'react-table-daeng';
import TableFilter from '../table-filter';

const ColText = styled.span`
  display: block;
  font-weight: 600;
  width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

class ColCell extends Component {
  constructor(props) {
    super(props);
    this._onClickFilterIcon = this._onClickFilterIcon.bind(this);
    this._onClickAddFilter = this._onClickAddFilter.bind(this);
    this._onClickResetFilters = this._onClickResetFilters.bind(this);
    this._onClickOutside = this._onClickOutside.bind(this);
  }

  render() {
    const {
      _onClickFilterIcon,
      _onClickAddFilter,
      _onClickResetFilters,
      _onClickOutside,
    } = this;
    const {
      col,
      idx,
      filters,
      onContextMenu,
      popTableFilter,
      whichFilterOpen,
    } = this.props;
    const colFilters = filters.filter(obj => obj.col === col.key);
    return (
      <div
        style={{
          width: col.width,
          minWidth: col.width,
          backgroundColor: '#ccc',
          borderLeft: idx === 0 ? 'none' : '1px white solid',
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 0 0 10px',
          position: 'relative',
          fontSize: '11px',
        }}
        onContextMenu={event => onContextMenu({ event, type: 'col', col })}
      >
        <ColText>{col.title}</ColText>
        <Icon
          type="filter"
          theme="outlined"
          style={{
            cursor: 'pointer',
            color: colFilters.length === 0 ? '#5b5b5b' : '#04bed6',
          }}
          onClick={_onClickFilterIcon}
        />
        {whichFilterOpen === col.key ? (
          <TableFilter
            width="240px"
            x={161}
            y={34}
            filters={colFilters}
            onClickAdd={_onClickAddFilter}
            onClickReset={_onClickResetFilters}
            onClickRemove={popTableFilter}
            onClickOutside={_onClickOutside}
          />
        ) : null}
      </div>
    );
  }

  _onClickFilterIcon(event) {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    const { col, whichFilterOpen, setWhichFilterOpen } = this.props;
    setWhichFilterOpen(whichFilterOpen === col.key ? '' : col.key);
  }

  _onClickAddFilter(value) {
    const { col, pushTableFilter } = this.props;
    pushTableFilter({ col: col.key, value });
  }

  _onClickResetFilters() {
    const { col, resetTableFilters } = this.props;
    resetTableFilters({ col: col.key });
  }

  _onClickOutside() {
    this.props.setWhichFilterOpen('');
  }
}

const RowContainer = styled.div`
  display: flex;
  height: 30px;
  min-height: 30px;
`;
class Row extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHover: false,
    };
    this._onMouseOver = this._onMouseOver.bind(this);
    this._onMouseLeave = this._onMouseLeave.bind(this);
  }

  render() {
    const { _onMouseLeave, _onMouseOver } = this;
    const {
      row,
      columns,
      selectedRows,
      idx: rowIdx,
      onContextMenu,
      onClick,
    } = this.props;
    const { isHover } = this.state;
    const isSelected = selectedRows.includes(row.key);
    return (
      <RowContainer
        onClick={event => onClick({ event, type: 'cell', row })}
        onMouseOver={_onMouseOver}
        onMouseLeave={_onMouseLeave}
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
              isSelected={isSelected}
              isHover={isHover}
              onContextMenu={event =>
                onContextMenu({ event, type: 'cell', row, col })
              }
            />
          );
        })}
      </RowContainer>
    );
  }

  _onMouseOver() {
    this.setState({ isHover: true });
  }

  _onMouseLeave() {
    this.setState({ isHover: false });
  }
}

const RowCell = ({
  label,
  width,
  rowIdx,
  colIdx,
  isSelected,
  isHover,
  onContextMenu,
}) => {
  return (
    <div
      style={{
        width,
        minWidth: width,
        backgroundColor: isHover
          ? '#f8f8f8'
          : isSelected
            ? '#eefdff'
            : '#ffffff',
        color: isSelected ? '#04bed6' : '#777777',
        borderTop: rowIdx === 0 ? 'none' : '1px #ebebeb solid',
        borderLeft: colIdx === 0 ? 'none' : '1px #ebebeb solid',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '10px',
        fontWeight: isSelected ? '500' : '400',
        fontSize: '12px',
      }}
      onContextMenu={onContextMenu}
    >
      {label}
    </div>
  );
};

class HistoryTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      whichFilterOpen: '',
    };
    this._setWhichFilterOpen = this._setWhichFilterOpen.bind(this);
  }

  render() {
    const { _setWhichFilterOpen } = this;
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
    const { whichFilterOpen } = this.state;
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
          whichFilterOpen={whichFilterOpen}
          setWhichFilterOpen={_setWhichFilterOpen}
        />
      ),
    }));
    const rows = _rows
      .filter(
        row =>
          filters.length === 0 ||
          filters.reduce((valid, filter) => {
            let label = row[filter.col];
            if (label === undefined) return valid;
            label = `${label}`;
            label = label.toLowerCase();
            const filterValue = `${filter.value}`.toLowerCase();
            return valid && label.includes(filterValue);
          }, true),
      )
      .map((row, idx) => {
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

  _setWhichFilterOpen(col) {
    this.setState({
      whichFilterOpen: col,
    });
  }
}

export default HistoryTable;
