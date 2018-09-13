import React, { Component } from 'react';
import styled from 'styled-components';
import { Select, Dropdown, Button, Menu, Checkbox, Icon } from 'antd';
import Chart from '../../2-molecules/chart';
import {
  _getG,
  _toggleSeries,
  _highlightSeries,
} from '../../2-molecules/chart/helpers';

const Container = styled.div.attrs({
  style: props => ({ display: props.active ? null : 'none' }),
})`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  padding: 0 20px;
  margin-top: 24px;
  margin-bottom: 10px;
  justify-content: space-between;
`;

const SelectArea = styled.div`
  display: flex;
  align-items: center;
`;

const SelectLabel = styled.span`
  margin-right: 10px;
  font-size: 12px;
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
    this._makeLabelsDropdownMenus = this._makeLabelsDropdownMenus.bind(this);
    this._makeSeriesDropdownMenu = this._makeSeriesDropdownMenu.bind(this);
    this._onClickLabelsDropdownMenu = this._onClickLabelsDropdownMenu.bind(
      this,
    );
    this._onCheckSeriesDropdownMenu = this._onCheckSeriesDropdownMenu.bind(
      this,
    );
    this._onClickSeriesDropdownMenu = this._onClickSeriesDropdownMenu.bind(
      this,
    );
  }

  render() {
    const { _makeLabelsDropdownMenus, _makeSeriesDropdownMenu } = this;
    const {
      parameters,
      selectedParams,
      onClickParam,
      location,
      onSetChartEl,
    } = this.props;
    const selectedParamObj = parameters.find(obj =>
      selectedParams.includes(obj.PARAM_NAME),
    );
    return (
      <Container active={location === 'charts'}>
        <Header>
          <SelectArea className="parameters">
            {/* <Icon type="profile" theme="filled" /> */}
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
            {/* <Dropdown overlay={_makeSeriesDropdownMenu()} trigger={['click']}>
              <Button
                style={{
                  width: '160px',
                  borderRadius: '0',
                  border: '0',
                  fontSize: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                Series
                <Icon
                  type="down"
                  theme="outlined"
                  style={{ paddingRight: '0' }}
                />
              </Button>
            </Dropdown> */}
            <Dropdown overlay={_makeLabelsDropdownMenus()} trigger={['click']}>
              <Button
                style={{
                  width: '160px',
                  marginLeft: '10px',
                  borderRadius: '0',
                  border: '0',
                  fontSize: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                Labels
                <Icon
                  type="down"
                  theme="outlined"
                  style={{ paddingRight: '0' }}
                />
              </Button>
            </Dropdown>
          </SelectArea>
        </Header>
        <ChartArea>
          <Chart
            param={!selectedParamObj ? '' : selectedParamObj.PARAM_INFO}
            id="0"
            onZoomReset={id => {}}
            onSetChartEl={onSetChartEl}
          />
        </ChartArea>
      </Container>
    );
  }

  _makeLabelsDropdownMenus() {
    const { onClickLabelsDropdownMenu, tickLabels } = this.props;
    return (
      <Menu
        className="series-label-select"
        style={{ borderRadius: '0' }}
        onClick={onClickLabelsDropdownMenu}
      >
        {tickLabels.map(label => (
          <Menu.Item
            style={{
              fontSize: '12px',
              color: label.selected ? '#535353' : '#ccc',
            }}
            key={label.key}
          >
            <Checkbox
              checked={label.selected}
              style={{ marginRight: '10px' }}
              onChange={() => onClickLabelsDropdownMenu({ key: label.key })}
            />
            {label.display}
          </Menu.Item>
        ))}
      </Menu>
    );
  }

  _makeSeriesDropdownMenu() {
    const {
      onCheckSeriesDropdownMenu,
      onClickSeriesDropdownMenu,
      chartSeries,
    } = this.props;
    return (
      <Menu
        className="series-label-select"
        style={{ borderRadius: '0' }}
        onClick={onClickSeriesDropdownMenu}
      >
        {chartSeries.map(series => (
          <Menu.Item
            style={{
              fontSize: '12px',
              color: series.selected ? '#535353' : '#ccc',
            }}
            key={series.key}
          >
            <Checkbox
              name={series.key}
              checked={series.selected}
              style={{ marginRight: '10px' }}
              onChange={onCheckSeriesDropdownMenu}
            />
            {series.display}
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

  _onCheckSeriesDropdownMenu({ target: { name: key, checked } }) {
    const { chartId } = this.state;
    !!chartId &&
      this.setState(prevState => {
        const seriesIdx = prevState.chartSeries.findIndex(
          obj => obj.key === key,
        );
        const series = prevState.chartSeries[seriesIdx];
        _toggleSeries(chartId, series.key, checked);
        return {
          ...prevState,
          chartSeries: [
            ...prevState.chartSeries.slice(0, seriesIdx),
            { ...series, selected: checked },
            ...prevState.chartSeries.slice(seriesIdx + 1),
          ],
        };
      });
  }

  _onClickSeriesDropdownMenu({ key }) {
    const { chartId } = this.state;
    const g = _getG(chartId);
    !!g && _highlightSeries(g, key);
  }
}

export default MainChartPresenter;
