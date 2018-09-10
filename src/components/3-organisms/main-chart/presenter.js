import React from 'react';
import styled from 'styled-components';
import { Select } from 'antd';
import Chart from '../../2-molecules/chart';

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
  padding: 0 20px 20px 20px;
`;

const Option = Select.Option;

const MainChartPresenter = ({
  parameters,
  selectedParams,
  onClickParam,
  onFetchStart,
  onFetchSuccess,
  onFetchFail,
  fab,
  mod,
  from,
  to,
  lot,
}) => (
  <Container>
    <ParameterArea className="parameters">
      <span style={{ marginRight: '10px', fontSize: '13px' }}>
        Parameters:{' '}
      </span>
      <Select
        value={selectedParams}
        placeholder="Select parameter"
        showSearch={true}
        style={{ width: '180px', fontSize: '12px' }}
        dropdownStyle={{ fontSize: '12px' }}
        onSelect={val => onClickParam(val)}
      >
        {parameters.map(param => (
          <Option key={param.PARAM_NAME} title={param.PARAM_INFO}>
            {param.PARAM_INFO}
          </Option>
        ))}
      </Select>
    </ParameterArea>
    <ChartArea>
      <Chart
        fab={fab}
        mod={mod}
        from={from}
        to={to}
        lot={lot}
        param={selectedParams[0]}
        onFetchStart={onFetchStart}
        onFetchSuccess={onFetchSuccess}
        onFetchFail={onFetchFail}
      />
    </ChartArea>
  </Container>
);

export default MainChartPresenter;
