import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import styled, { css } from 'styled-components';
import styled from 'styled-components';
import Contextmenu from '../contextmenu/index';
// import { Table as AntdTable } from 'antd';

const Container = styled.div`
  width: ${props => props.width}
  height: ${props => props.height}
  overflow: auto;
  display: flex;
  flex-direction: column;
  position: relative;
  text-align: left; 
  background-color: #f4f2f4;
`;

const FilterContainer = styled.div`
  min-height: 80px;
  border: 1px solid indianred;
  background-color: #fff;
  margin-bottom: 10px;
`;

const HeaderContainer = styled.div`
  width: 100%;
  height: 50px;
  min-height: 50px;
  background-color: #fff;
  border-radius: 3px 3px 0 0;
`;

const RowHeader = styled.div`
  width: 100%;
  display: flex;
  box-sizing: border-box;
  margin: 5px 0 0 5px;
  padding: 10px;
  background-color: #eae5ea;
  border-radius: 3px 3px 0 0;
`;

const Blank = styled.div`
  background-color: #fff;
`;

const BodyContainer = styled.div`
  width: 100%;
  background-color: #fff;
`;

const RowBody = styled.div`
  width: 100%;
  height: 35px;
  min-height: 35px;
  line-height: 35px;
  display: flex;
  background-color: #fff;
  font-size: 12px;
  text-indent: 10px;
  margin: 0 5px;
  &:nth-child(2n) {
    background-color: #f4f2f4;
  }
`;

const contextItems = [
  { name: 'View Trace Data(Time)', icon: 'area-chart', key: '1' },
  { name: 'View Trace Data(Lot)', icon: 'pie-chart', key: '2' },
  { name: 'View Trace Data(Overlay)', icon: 'dot-chart', key: '3' },
];

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      scrollTop: 0,
      contextmenu: {
        visible: false,
        x: 0,
        y: 0,
      },
    };
    this.table = React.createRef();
    this._onContextmenu = this._onContextmenu.bind(this);
    this._onClickOutside = this._onClickOutside.bind(this);
    this._onFixedHeader = this._onFixedHeader.bind(this);
  }

  // 메뉴 오픈 위치 잡기, 위치 그지같음
  _onContextmenu(evt) {
    console.log(evt);
    evt.stopPropagation();
    evt.preventDefault();

    const { button, pageX, pageY } = evt;
    console.log(pageX);
    console.log(pageY);

    if (button === 2) {
      this.setState(prevState => ({
        ...prevState,
        contextmenu: {
          ...prevState.contextmenu,
          visible: true,
          x: pageX,
          y: pageY,
        },
      }));
    }
  }

  _onClickOutside() {
    this.setState({
      contextmenu: {
        visible: false,
      },
    });
  }

  _onFixedHeader(evt) {

  }

  render() {
    const { _handleScroll, _onContextmenu, _onClickOutside, _onFixedHeader } = this;
    const { width, height, columns, dataSource } = this.props;
    return (
      <Container
        width={width}
        height={height}
        ref={this.table}
        onScroll={_handleScroll}>

        <FilterContainer>
          <p>filter area</p>
        </FilterContainer>

        <HeaderContainer onScroll={_onFixedHeader}>
          <RowHeader head={true}>
            {columns.map(col => (
              <div
                key={col.key}
                style={{
                  width: col.width,
                  minWidth: col.width,
                }}
              >
                {col.title}
              </div>
            ))}
          </RowHeader>
        </HeaderContainer>
        
        <Blank />
        
        <BodyContainer>
          {dataSource.map(row => (
            <RowBody
              onContextMenu={_onContextmenu}
              key={row.key}>
              {columns.map(col => (
                <div
                  key={col.key}
                  style={{
                    width: col.width,
                    minWidth: col.width,
                    borderBottom: '1px solid #ccc',
                    boxSizing: 'border-box',
                  }}
                >
                  {row[col.dataIndex]}
                </div>
              ))}
            </RowBody>
          ))}
        </BodyContainer>
        <Contextmenu
          items={contextItems}
          visible={this.state.contextmenu.visible}
          x={this.state.contextmenu.x}
          y={this.state.contextmenu.y}
          onClickOutside={_onClickOutside}
          onClickMenu={e => console.log(e._key)}/>
      </Container>
    );
  }
}

Table.defaultProps = {
  width: '100%',
  height: '100%',
  columns: [],
  dataSource: [],
};

Table.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  columns: PropTypes.array,
  dataSource: PropTypes.array,
};

export default Table;
