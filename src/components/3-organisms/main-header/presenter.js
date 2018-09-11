import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Breadcrumb } from 'antd';

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 10px;
  background-color: #fff;
  border-bottom: 1px solid #e3e3e3;
  display: flex;
  align-items: center;
`;

const Link = styled.div`
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  color: ${props => (props.active ? '#04bed6' : '#000000')};
`;

class MainHeader extends Component {
  render() {
    const { location, onClickHistory, onClickTrace } = this.props;
    return (
      <Container>
        <Breadcrumb separator="||">
          <Breadcrumb.Item>
            <Link onClick={onClickHistory} active={location === 'histories'}>
              Lot / Wafer History View
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link onClick={onClickTrace} active={location === 'charts'}>
              Trace Data View
            </Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      </Container>
    );
  }
}

MainHeader.propTypes = {
  location: PropTypes.string.isRequired,
  onClickHistory: PropTypes.func.isRequired,
  onClickTrace: PropTypes.func.isRequired,
};

export default MainHeader;
