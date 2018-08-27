import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
// import { Table as AntdTable } from 'antd';

const Container = styled.div`
  width: ${props => props.width}
  height: ${props => props.height}
  overflow: auto;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Row = styled.div`
  width: 100%;
  height: 60px;
  min-height: 60px;
  display: flex;
`;

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = { scrollTop: 0 };
    this.table = React.createRef();
  }
  render() {
    const { _handleScroll } = this;
    const { width, height, columns, dataSource } = this.props;
    return (
      <Container
        width={width}
        height={height}
        ref={this.table}
        onScroll={_handleScroll}
      >
        <Row head={true}>
          {columns.map(col => (
            <div
              key={col.key}
              style={{
                width: col.width,
                minWidth: col.width,
                border: '1px solid black',
                boxSizing: 'border-box',
              }}
            >
              {col.title}
            </div>
          ))}
        </Row>
        <Row />
        {dataSource.map(row => (
          <Row key={row.key}>
            {columns.map(col => (
              <div
                key={col.key}
                style={{
                  width: col.width,
                  minWidth: col.width,
                  border: '1px solid black',
                  boxSizing: 'border-box',
                }}
              >
                {row[col.dataIndex]}
              </div>
            ))}
          </Row>
        ))}
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
