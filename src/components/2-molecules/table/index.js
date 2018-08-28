import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import styled, { css } from 'styled-components';
import styled from 'styled-components';

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

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollTop: 0,
    };
    this.table = React.createRef();
  }

  render() {
    const { width, height, columns, dataSource, onContextMenuRow } = this.props;
    return (
      <Container width={width} height={height} ref={this.table}>
        <HeaderContainer>
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
              key={row.key}
              data-row-key={row.key}
              onContextMenu={onContextMenuRow}
            >
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
      </Container>
    );
  }
}

Table.defaultProps = {
  width: '100%',
  height: '100%',
  columns: [],
  dataSource: [],
  onContextMenuRow: () => console.warn('[Table] No onContextmenuRow prop'),
};

Table.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  columns: PropTypes.array,
  dataSource: PropTypes.array,
  onContextMenuRow: PropTypes.func,
};

export default Table;
