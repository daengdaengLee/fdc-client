import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import Contextmenu from '../../2-molecules/contextmenu/index';
// import './../../../index.css';

import { Tree, Input, Icon } from 'antd';
const DirectoryTree = Tree.DirectoryTree;
const TreeNode = Tree.TreeNode;
const Search = Input.Search;

const Container = styled.div`
  width: 100%;
  height: 100%;
  border-right: 1px solid black;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 10px;
  overflow: auto;
`;

const Title = styled.h1`
  font-size: 14px;
`;

const TreeContainer = styled.div`
  width: 100%;
`;

// TODO: [EUNJU]_TEST용 data, 추후삭제예정
const dummyDatas = [...Array(20)].map((v, i) => ({
  chName: `CH Name${i}`,
  key: `${i}`,
}));

const contextItems = [
  {name: 'Real Time View', icon: 'star-o', key: '1'},
  {name: 'Lot/Wafer View', icon: 'star-o', key: '2'},
];

class MainNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterdeData: [],
      searchValue: '',
      autoFiltering: true,

      contextmenu: {
        visible: false,
        x: 0,
        y: 0,
      },
    };
    this._onContextmenu = this._onContextmenu.bind(this);
    this._onClickOutside = this._onClickOutside.bind(this);
    this._onSelectNode = this._onSelectNode.bind(this);
    // this._onSearchChange = this._onSearchChange.bind(this);
  }

  // 3. dcp name 이하의 node에서만 contextmenu 열리도록
  _onContextmenu(evt) {
    const { clientX, clientY } = evt;
    this.setState(prevState => ({
      ...prevState,
      contextmenu: {
        ...prevState.contextmenu,
        // visible: !prevState.contextmenu.visible,
        visible: true, // 우클릭 시마다 열림
        x: clientX,
        y: clientY,
      },
    }));
  }; 

  _onClickOutside() {
    this.setState({
      contextmenu: {
        visible: false,
      },
    });
  };

  _onSelectNode() {
    console.log('select');
  };

  // _onSearchChange(evt) {
  //   const value = evt.target.value;
  //   const _filterKeys = dummyDatas.map((item) => {
  //     if (item.chName.indexOf(value) > -1) {
  //       return testParentKey(item.key, filterdeData);
  //     }
  //     return null;
  //   }).filter((item, i, self) => item && self.indexOf(item) === i);
  //   this.setState({
  //     _filterKeys,
  //     searchValue: value,
  //     autoFiltering: true,
  //   });

  //   console.log(value);
  // };

  render() {
    const { 
      _onContextmenu, 
      _onClickOutside, 
      _onSelectNode,
      _onSearchChange,
      // _filterKeys,
    } = this;
    // const {
    // } = this.props;
    return (
      // Container 로 변경 
      <Container> 
        <Title>
          <Icon type="share-alt" />
          Search Condition
        </Title>
        <TreeContainer>
          <Search 
            onChange={_onSearchChange}
            placeholder="Search node ..."/>
          <DirectoryTree
            multiple
            // showLine
            // defaultExpandAll
            // expandedKeys={_filterKeys} //
            onSelect={_onSelectNode}
            onRightClick={({ event }) => _onContextmenu(event)} 
            defaultExpandedKeys={['0-0-0-0-0-0-0']}
          >
            <TreeNode title="Fab" key="0-0">
              <TreeNode title="Area" key="0-0-0">
                <TreeNode title="SDPT" key="0-0-0-0">
                  <TreeNode title="EQP Model" key="0-0-0-0-0">
                    <TreeNode title="EQP ID" key="0-0-0-0-0-0">
                      <TreeNode title="DCP Name" key="0-0-0-0-0-0-0">
                        {dummyDatas.map((dummyData) => {
                          return (
                            <TreeNode 
                              title={dummyData.chName} 
                              key={`0-0-0-0-0-0-0-${dummyData.key}`} 
                              isLeaf/>
                          );
                        })}
                      </TreeNode>
                      <TreeNode title="DCP Name" key="0-0-0-0-0-0-1">
                        {dummyDatas.map((dummyData) => {
                          return (
                            <TreeNode 
                              title={dummyData.chName} 
                              key={`0-0-0-0-0-0-1-${dummyData.key}`} 
                              isLeaf/>
                          );
                        })}
                      </TreeNode>
                    </TreeNode>
                  </TreeNode>
                </TreeNode>
              </TreeNode>
            </TreeNode>
          </DirectoryTree>
        </TreeContainer>

        {/* context menu -> visible */}
        <Contextmenu
          items={contextItems}
          visible={this.state.contextmenu.visible}
          x={this.state.contextmenu.x}
          y={this.state.contextmenu.y}
          onClickOutside={_onClickOutside}
          onClickMenu={e => console.log(e._key)}
        />
      </Container>
    );
  }
};

MainNavigation.defaultProps = {
  // TreeContextmenu: (evt) =>
  //   console.log('[WARNNING] There is no TreeContextmenu handler', evt),
};

MainNavigation.propTypes = {
  // TreeContextmenu: PropTypes.func,
};

export default MainNavigation;
