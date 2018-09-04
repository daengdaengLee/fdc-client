import React from 'react';
import styled from 'styled-components';
import { Select } from 'antd';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ParameterArea = styled.div`
  height: 80px;
  display: flex;
  padding: 20px;
  align-items: center;
`;

const ChartArea = styled.div`
  height: 0;
  flex-grow: 1;
`;

const Option = Select.Option;

const MainChartPresenter = ({ parameters, selectedParams, onClickParam }) => (
  <Container>
    <ParameterArea>
      <span style={{ marginRight: '10px' }}>Parameters: </span>
      <Select
        value={selectedParams}
        style={{ width: '10rem' }}
        onSelect={val => onClickParam(val)}
      >
        {parameters.map(param => (
          <Option key={param.PARAM_NAME} title={param.PARAM_INFO}>
            {param.PARAM_INFO}
          </Option>
        ))}
      </Select>
    </ParameterArea>
    <ChartArea>Chart</ChartArea>
  </Container>
);

export default MainChartPresenter;
