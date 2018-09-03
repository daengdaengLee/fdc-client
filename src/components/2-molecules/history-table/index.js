import React, { Component } from 'react';
import { Icon } from 'antd';
import { Table } from 'react-table-daeng';
import TableFilter from '../../2-molecules/table-filter';

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

class HistoryTable extends Component {
  render() {
    const { columns: _columns, rows, onContextMenu } = this.props;
    const columns = _columns.map(col => ({
      ...col,
      renderCell: col => <FilterColCell key={col.key} col={col} />,
    }));
    return (
      <Table columns={columns} rows={rows} onContextMenu={onContextMenu} />
    );
  }
}

export default HistoryTable;
