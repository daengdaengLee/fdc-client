import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Contextmenu from '../../2-molecules/contextmenu/index';
// import './../../../index.css';

import { Tree, Icon } from 'antd';
const DirectoryTree = Tree.DirectoryTree;
const TreeNode = Tree.TreeNode;

const Container = styled.div`
  width: 100%;
  height: 100%;
  border-right: 1px solid #e3e3e3;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 0 10px;
  overflow: auto;
  overflow-x: hidden;
`;

const Logo = styled.div`
  height: 45px;
  line-height: 45px;
  font-family: 'Quicksand', sans-serif;
  font-weight: 500;
  margin-bottom: 10px;
`;

const SearchTitle = styled.div`
  font-size: 14px;
  margin-bottom: 10px;
`;

const TreeContainer = styled.div`
  width: 100%;
  height: 70%;
  border: 1px solid olive;
`;

// TODO: [EUNJU]_TEST용 data, 추후삭제예정
// const dummyDatas = [...Array(20)].map((v, i) => ({
//   chName: `CH Name${i}`,
//   key: `${i}`,
// }));

const contextItems = [
  {name: 'Real Time View', icon: 'star-o', key: '1'},
  {name: 'Lot/Wafer View', icon: 'star-o', key: '2'},
];

class MainNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      treeData: [
        { title: 'M10', key: '0' },
        { title: 'M14', key: '1', disabled: true },
      ],
      contextmenu: {
        visible: false,
        x: 0,
        y: 0,
      },
    };
    this._onContextmenu = this._onContextmenu.bind(this);
    this._onClickOutside = this._onClickOutside.bind(this);
    this._onSelectNode = this._onSelectNode.bind(this);
    // this.onRequestFetch = this.onRequestFetch.bind(this);
    // this._onLoadTreeData = this._onLoadTreeData.bind(this);
    // this._onRenderTreeList = this._onRenderTreeList.bind(this);
  }

  render() {
    const { 
      _onContextmenu, 
      _onClickOutside, 
      _onSelectNode,
      // _onLoadTreeData,
      // _onRenderTreeList,
    } = this;
    const { nodes } = this.props;
    return (
      <Container> 
        <Logo>
          {/* logo image 추가예정 */}
          FDC. Title & Logo area
        </Logo>
        <SearchTitle>
          <Icon type="share-alt" />
          Search Condition
        </SearchTitle>
        <TreeContainer>
          <DirectoryTree
            multiple
            // showLine
            // defaultExpandAll
            onSelect={_onSelectNode}
            onRightClick={({ event }) => _onContextmenu(event)} 
            // loadData={_onLoadTreeData}
            defaultExpandedKeys={['0-0-0-0-0-0']}
          >
            {/* {_onRenderTreeList(this.state.treeData)} */}

            <TreeNode title="M10" key="0-0">
              {nodes.map((node) => {
                return (
                  <TreeNode 
                    title={node.title} 
                    key='0-0-1'
                    isLeaf />
                );
              })}
            </TreeNode>

            {/* <TreeNode title="M10" key="0-0">
              <TreeNode title="Area" key="0-0-0">
                <TreeNode title="SDPT" key="0-0-0-0">
                  <TreeNode title="EQP Model" key="0-0-0-0-0">
                    <TreeNode title="EQP ID" key="0-0-0-0-0-0">
                      {dummyDatas.map((dummyData) => {
                        return (
                          <TreeNode 
                            title={dummyData.chName} 
                            key={`0-0-0-0-0-0-0-${dummyData.key}`} 
                            isLeaf/>
                        );
                      })}
                    </TreeNode>
                  </TreeNode>
                </TreeNode>
              </TreeNode>
            </TreeNode> */}

          </DirectoryTree>
        </TreeContainer>

        {/* add: from / to */}
        {/* add: bottom */}

        <Contextmenu
          theme="tree"
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

  componentDidMount() {
    this.props.onRequestFetch({ fab: 'M14' });
  };

  _onContextmenu(evt) {
    const { clientX, clientY } = evt;
    this.setState(prevState => ({
      ...prevState,
      contextmenu: {
        ...prevState.contextmenu,
        visible: true,
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

  // _onLoadTreeData = (treeData) => {
  //   return new Promise ((resolve) => {
  //     if (treeData.props.children) {
  //       resolve();
  //       return;
  //     }
  //     // setTimeout(() => {
  //     treeData.props.dataRef.children = [
  //       { title: 'Child Node', key: `${treeData.props.eventKey} - 0` },
  //       { title: 'Child Node', key: `${treeData.props.eventKey} - 1` },
  //     ];
  //     this.setState({
  //       treeData: [...this.state.treeData],
  //     });
  //     resolve();
  //     // }, 1000);
  //   });
  // };

  // _onLoadTreeData = (nodes) => {
  //   return nodes.map((node) => {
  //     return (
  //       <TreeNode title={node.title} key="0-0-0"></TreeNode>
  //     );
  //   });
  // };

  // _onRenderTreeList = (nodes) => {
  //   // return data.map((item) => {
  //   //   if (item.children) {
  //   //     return (
  //   //       <TreeNode title={item.title} key={item.key} dataRef={item}>
  //   //         {this._onRenderTreeList(item.children)}
  //   //       </TreeNode>
  //   //     );
  //   //   }
  //   //   return <TreeNode { ...item } dataRef={item} />;
  //   // });

  //   return nodes.map((node) => {
  //     return (
  //       <TreeNode title={node.title} key="0-0-0"></TreeNode>
  //     );
  //   });
  // };
};

MainNavigation.defaultProps = {
  nodes: [],
  onRequestFetch: evt =>
    console.log('[WARNNING] There is no onChangeFabs handler', evt),
};

MainNavigation.propTypes = {
  nodes: PropTypes.arrayOf(() => {
    //
  }),
  onRequestFetch: PropTypes.func,
};

export default MainNavigation;
