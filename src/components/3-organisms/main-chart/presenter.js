import React, { Component } from 'react';
import styled from 'styled-components';
import { Select, Dropdown, Button, Menu, Checkbox } from 'antd';
import Chart from '../../2-molecules/chart';

// const _hideChartTickLabel = key => {
//   const selector = `.dygraph-tick-label-${key}`;
//   document.querySelectorAll(selector).forEach(tick => {
//     tick.style.display = 'none';
//   });
// };

// const _showChartTickLabel = key => {
//   const selector = `.dygraph-tick-label-${key}`;
//   document.querySelectorAll(selector).forEach(tick => {
//     tick.style.display = 'inline';
//   });
// };

const Container = styled.div.attrs({
  style: props => ({ display: props.active ? null : 'none' }),
})`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  height: 80px;
  display: flex;
  padding: 20px;
  justify-content: space-between;
`;

const SelectArea = styled.div`
  display: flex;
  align-items: center;
  margin-right: 14px;
`;

const SelectLabel = styled.span`
  margin-right: 10px;
  font-size: 13px;
`;

const ChartArea = styled.div`
  height: 0;
  flex-grow: 1;
  padding: 0 20px 20px 20px;
`;

const Option = Select.Option;

class MainChartPresenter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartLabels: [
        {
          key: 'STEP',
          display: 'Step',
          selected: true,
        },
        {
          key: 'STEP_NAME',
          display: 'Step Name',
          selected: true,
        },
        {
          key: 'SLOT',
          display: 'Slot',
          selected: true,
        },
      ],
      chartId: null,
    };
    this._onRegisterChartId = this._onRegisterChartId.bind(this);
    this._makeLabelsDropdownMenus = this._makeLabelsDropdownMenus.bind(this);
    this._onClickLabelsDropdownMenu = this._onClickLabelsDropdownMenu.bind(
      this,
    );
  }

  render() {
    const { _makeLabelsDropdownMenus, _onRegisterChartId } = this;
    const {
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
      location,
    } = this.props;
    const { chartLabels } = this.state;
    const selectedParamObj = parameters.find(obj =>
      selectedParams.includes(obj.PARAM_NAME),
    );
    const selectedLabels = chartLabels
      .filter(obj => obj.selected)
      .map(obj => obj.key);
    return (
      <Container active={location === 'charts'}>
        <Header>
          <SelectArea className="parameters">
            <SelectLabel>Parameters: </SelectLabel>
            <Select
              value={selectedParams}
              placeholder="Select parameter"
              showSearch={true}
              optionFilterProp="title"
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
          </SelectArea>
          <SelectArea>
            <Dropdown overlay={<div>hi</div>} trigger={['click']}>
              <Button>Series</Button>
            </Dropdown>
            <Dropdown overlay={_makeLabelsDropdownMenus()} trigger={['click']}>
              <Button>Labels</Button>
            </Dropdown>
          </SelectArea>
        </Header>
        <ChartArea>
          <Chart
            fab={fab}
            mod={mod}
            from={from}
            to={to}
            lot={lot}
            param={selectedParamObj}
            selectedLabels={selectedLabels}
            onFetchStart={onFetchStart}
            onFetchSuccess={onFetchSuccess}
            onFetchFail={onFetchFail}
            onRegisterId={_onRegisterChartId}
          />
        </ChartArea>
      </Container>
    );
  }

  _onRegisterChartId(id) {
    this.setState({ chartId: id });
  }

  _makeLabelsDropdownMenus() {
    const { _onClickLabelsDropdownMenu } = this;
    const { chartLabels } = this.state;
    return (
      <Menu onClick={_onClickLabelsDropdownMenu}>
        {chartLabels.map(label => (
          <Menu.Item key={label.key}>
            <Checkbox
              checked={label.selected}
              style={{ marginRight: '10px' }}
            />
            {label.display}
          </Menu.Item>
        ))}
      </Menu>
    );
  }

  _onClickLabelsDropdownMenu({ key }) {
    const { onToggleTickLabel } = this.props;
    const { chartId } = this.state;
    !!chartId &&
      this.setState(prevState => {
        const labelIdx = prevState.chartLabels.findIndex(
          label => label.key === key,
        );
        const label = prevState.chartLabels[labelIdx];
        onToggleTickLabel(prevState.chartId, label.key, !label.selected);
        return {
          ...prevState,
          chartLabels: [
            ...prevState.chartLabels.slice(0, labelIdx),
            { ...label, selected: !label.selected },
            ...prevState.chartLabels.slice(labelIdx + 1),
          ],
        };
      });
  }
}

export default MainChartPresenter;
