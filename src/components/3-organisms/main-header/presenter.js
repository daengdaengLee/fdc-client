import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon } from 'antd';
// import IconTable from '../../../assets/img/ic-table.png';
// import IconChart from '../../../assets/img/ic-chart.png';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const Link = styled.div`
  cursor: pointer;
  width: 200px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  font-size: 12px;
  color: ${props => (props.active ? '#04bed6' : '#535353')};
  font-weight: ${props => (props.active ? '500' : '400')};
  border-bottom: ${props =>
    props.active ? '1px solid #04bed6' : '1px solid #f8f8f8'};
`;

// const IconImg = styled.img`
//   width: 17px;
//   margin-right: 5px;
// `;

const MainHeader = ({ location, onClickHistory, onClickTrace }) => (
  <Container>
    {location === 'main' ? null : (
      <Fragment>
        <Link onClick={onClickHistory} active={location === 'histories'}>
          <Icon type="table" theme="outlined" style={{ color: '#535353' }} />
          Lot / Wafer History View
          {/* <IconImg src={IconTable} alt='' />
          Lot / Wafer History View */}
        </Link>
        <Link onClick={onClickTrace} active={location === 'charts'}>
          <Icon
            type="area-chart"
            theme="outlined"
            style={{ color: '#535353' }}
          />
          Trace Data View
          {/* <IconImg src={IconChart} alt='' />
          Trace Data View */}
        </Link>
      </Fragment>
    )}
  </Container>
);

MainHeader.propTypes = {
  location: PropTypes.string.isRequired,
  onClickHistory: PropTypes.func.isRequired,
  onClickTrace: PropTypes.func.isRequired,
};

export default MainHeader;
