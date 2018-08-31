import React, { Component } from 'react';
import styled from 'styled-components';
import { Icon } from 'antd';
import { Table } from 'react-table-daeng';
import Contextmenu from '../../2-molecules/contextmenu';

// Dummy Data
const columns = [...Array(20)].map((v, i) => ({
  title: `Column ${i}`,
  dataIndex: `COL_${i}`,
  key: i,
  width: '200px',
}));

const contextItems = [
  { name: 'View Trace Data(Time)', icon: 'area-chart', key: '1' },
  { name: 'View Trace Data(Lot)', icon: 'pie-chart', key: '2' },
  { name: 'View Trace Data(Overlay)', icon: 'dot-chart', key: '3' },
];

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

class MainTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onOffContext: false,
      contextX: 0,
      contextY: 0,
    };
    this._onClickOutside = this._onClickOutside.bind(this);
    this._onContextMenuRow = this._onContextMenuRow.bind(this);
  }

  render() {
    const { _onClickOutside, _onContextMenuRow } = this;
    const { rows } = this.props;
    const { onOffContext, contextX, contextY } = this.state;
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
        <Contextmenu
          theme="tables"
          items={contextItems}
          visible={onOffContext}
          x={contextX}
          y={contextY}
          onClickOutside={_onClickOutside}
          onClickMenu={e => console.log(e._key)}
        />
      </Container>
    );
  }

  componentDidMount() {
    const { onInit } = this.props;
    onInit();
  }

  _onClickOutside() {
    this.setState({
      onOffContext: false,
    });
  }

  _onContextMenuRow({ event, type, row, col }) {
    event.preventDefault();
    const { clientX, clientY } = event;
    this.setState(prevState => ({
      ...prevState,
      onOffContext: true,
      contextX: clientX,
      contextY: clientY,
    }));
  }
}

export default MainTable;
