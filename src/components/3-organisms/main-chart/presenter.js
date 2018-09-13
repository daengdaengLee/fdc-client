import React, { Component } from 'react';
import styled from 'styled-components';
import { Select, Menu, Checkbox } from 'antd';
import Chart from '../../2-molecules/chart';
import ChartControllerDropdown from '../../2-molecules/chart-controller-dropdown';

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
    this._makeHighlightDropdownMenu = this._makeHighlightDropdownMenu.bind(
      this,
    );
  }

  render() {
    const {
      _makeLabelsDropdownMenus,
      _makeSeriesDropdownMenu,
      _makeHighlightDropdownMenu,
    } = this;
    const {
      parameters,
      selectedParams,
      onClickParam,
      location,
      onSetChartEl,
      onZoomReset,
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
            <ChartControllerDropdown
              label="Highlights"
              overlay={_makeHighlightDropdownMenu()}
            />
            <ChartControllerDropdown
              label="Series"
              overlay={_makeSeriesDropdownMenu()}
            />
            <ChartControllerDropdown
              label="Labels"
              overlay={_makeLabelsDropdownMenus()}
            />
          </SelectArea>
        </Header>
        <ChartArea>
          <Chart
            param={!selectedParamObj ? '' : selectedParamObj.PARAM_INFO}
            id="0"
            onZoomReset={onZoomReset}
            onSetChartEl={onSetChartEl}
          />
        </ChartArea>
      </Container>
    );
  }

  _makeLabelsDropdownMenus() {
    const { onToggleTickLabel, tickLabels } = this.props;
    return (
      <Menu
        className="series-label-select"
        style={{ borderRadius: '0' }}
        onClick={({ key }) => {
          const label = tickLabels.find(obj => obj.key === key);
          onToggleTickLabel(0, key, !label.selected);
        }}
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
              onChange={() => onToggleTickLabel(0, label.key, !label.selected)}
            />
            {label.display}
          </Menu.Item>
        ))}
      </Menu>
    );
  }

  _makeSeriesDropdownMenu() {
    const { chartSeries, onToggleChartSeries } = this.props;
    const series = chartSeries[0] || [];
    return (
      <Menu
        className="series-label-select"
        style={{ borderRadius: '0' }}
        onClick={({ key }) => {
          const target = series.find(obj => obj.key === key);
          onToggleChartSeries(0, key, !target.selected);
        }}
      >
        {series.map(series => (
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
              onChange={() =>
                onToggleChartSeries(0, series.key, !series.selected)
              }
            />
            {series.display}
          </Menu.Item>
        ))}
      </Menu>
    );
  }

  _makeHighlightDropdownMenu() {
    const { chartHighlights, onToggleChartHighlight } = this.props;
    const highlights = chartHighlights[0] || [];
    return (
      <Menu
        className="series-label-select"
        style={{ borderRadius: '0' }}
        onClick={({ key }) => onToggleChartHighlight(0, key)}
      >
        {highlights.map(highlight => (
          <Menu.Item
            style={{
              fontSize: '12px',
            }}
            key={highlight.key}
          >
            {highlight.display}
          </Menu.Item>
        ))}
      </Menu>
    );
  }
}

export default MainChartPresenter;
