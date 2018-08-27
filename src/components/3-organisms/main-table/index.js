import React from 'react';
import styled from 'styled-components';
import Table from '../../2-molecules/table';

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
`;

const Title = styled.h2`
  height: 4rem;
  display: flex;
  align-items: center;
  padding-left: 2rem;
  overflow: hidden;
`;

const TableArea = styled.div`
  height: 0;
  flex-grow: 1;
  padding: 0.6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;

const MainTable = () => (
  <Container>
    <Title>Lot/Wafer View</Title>
    <TableArea>
      <Table columns={columns} dataSource={dataSource} />
    </TableArea>
  </Container>
);

export default MainTable;
