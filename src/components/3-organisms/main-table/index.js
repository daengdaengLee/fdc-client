import React from 'react';
import styled from 'styled-components';
import Table from '../../2-molecules/table';
import { Icon } from 'antd';

// Dummy Data
const columns = [...Array(20)].map((v, i) => ({
  title: `Column ${i}`,
  dataIndex: `COL_${i}`,
  key: i,
  width: '200px',
}));
const generateRow = i =>
  [...Array(20)].reduce(
    (acc, cur, idx) => ({ ...acc, [`COL_${idx}`]: Math.random() }),
    { key: i },
  );
const dataSource = [...Array(500)].map((v, i) => generateRow(i));

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

const MainTable = () => (
  <Container>
    <TitleContainer>
      <Title>
        {/* <Icon type="table"/> */}
        Lot/Wafer<br/>View
      </Title>
      <Location>
        <span
          style={{ marginRight: '10px', color: 'rgba(0, 0, 0, 0.85)' }}>
          <Icon type="table"/>
          Table
        </span>
        /
        <span
          style={{ margin: '10px' }}>
          <Icon type="area-chart" />
          Chart
        </span>
        {/* 페이지 이동: table / chart */}
      </Location>
    </TitleContainer>
    <TableArea>
      <Table columns={columns} dataSource={dataSource} />
    </TableArea>
  </Container>
);

export default MainTable;
