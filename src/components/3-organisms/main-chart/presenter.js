import React, { Component } from 'react';
import styled from 'styled-components';
import { Select, Menu, Checkbox, Icon } from 'antd';
import Chart from '../../2-molecules/chart';
import DropdownButton from '../../2-molecules/dropdown-button';
import ColorBox from '../../1-atoms/color-box';

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
            <DropdownButton
              style={{ justifyContent: 'space-between' }}
              overlay={_makeHighlightDropdownMenu()}
            >
              Highlights
              <Icon
                type="down"
                theme="outlined"
                style={{ paddingRight: '0' }}
              />
            </DropdownButton>
            <DropdownButton
              style={{ justifyContent: 'space-between' }}
              overlay={_makeSeriesDropdownMenu()}
            >
              Series
              <Icon
                type="down"
                theme="outlined"
                style={{ paddingRight: '0' }}
              />
            </DropdownButton>
            <DropdownButton
              style={{ justifyContent: 'space-between' }}
              overlay={_makeLabelsDropdownMenus()}
            >
              Labels
              <Icon
                type="down"
                theme="outlined"
                style={{ paddingRight: '0' }}
              />
            </DropdownButton>
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
              display: 'flex',
              alignItems: 'center',
            }}
            key={label.key}
          >
            <Checkbox
              checked={label.selected}
              style={{ marginRight: '10px' }}
              onChange={() => onToggleTickLabel(0, label.key, !label.selected)}
            />
            <span
              title={label.display}
              style={{
                padding: '0',
                display: 'inline-block',
                width: '105px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {label.display}
            </span>
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
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
            key={series.key}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Checkbox
                name={series.key}
                checked={series.selected}
                style={{ marginRight: '10px' }}
                onChange={() =>
                  onToggleChartSeries(0, series.key, !series.selected)
                }
              />
              <span
                title={series.display}
                style={{
                  padding: '0',
                  display: 'inline-block',
                  width: '85px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {series.display}
              </span>
            </div>

            <ColorBox size="10px" backgroundColor={series.color} />
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
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom:
                highlight.key === 'UNHIGHLIGHT_ALL'
                  ? '1px solid #efefef'
                  : 'none',
            }}
            key={highlight.key}
          >
            <span
              title={highlight.display}
              style={{
                padding: '0',
                display: 'inline-block',
                width: '115px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {highlight.display}
            </span>

            <ColorBox size="10px" backgroundColor={highlight.color} />
          </Menu.Item>
        ))}
      </Menu>
    );
  }
}

export default MainChartPresenter;
